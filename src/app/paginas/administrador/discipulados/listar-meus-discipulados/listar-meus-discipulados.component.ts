import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DiscipuladoService } from '../discipulado.service';
import { TurmaDiscipulado } from 'src/app/paginas/pagamentos/tipos';
import { UserService } from 'src/app/paginas/pagamentos/services/user.service';

@Component({
  selector: 'app-listar-meus-discipulados',
  templateUrl: './listar-meus-discipulados.component.html',
  styleUrls: ['./listar-meus-discipulados.component.css']
})
export class ListarMeusDiscipuladosComponent implements OnInit {

  listaDiscipulados: TurmaDiscipulado[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroNome: string = ''
  cliente: string = 'True'
  nivel: string = 'False'
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private service: DiscipuladoService,
    private router: Router
  ) {
    // Check if user is admin - you might want to get this from a user service or localStorage
    const userData = localStorage.getItem('usuario');
    if (userData) {
      const user = JSON.parse(userData);
      this.isAdmin = user.administrador || false;
    }
  }

  ngOnInit(): void {
    this.carregarDiscipulados()
  }

  carregarDiscipulados(){
    this.service.listarMeusDiscipulados(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
        this.listaDiscipulados = response.results
        this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
      })  
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarDiscipulados();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarDiscipulados();
    }
  }

  habilitarBotao(direcao: string): string {
    if (direcao === 'anterior' && this.paginaAtual === 1) {
      return 'botao_pag_desabilitado';
    }
    if (direcao === 'proxima' && this.paginaAtual === this.totalPaginas) {
      return 'botao_pag_desabilitado';
    }
    return 'botao_pag';
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')){
      this.service.excluir(id).subscribe(() => {
        alert('Discipulado excluido com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  pesquisarDiscipulado(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    // if (target.type === 'select-one') {
    //   if (target.id === 'cliente') {
    //     this.cliente = target.value;
    //   } else 
    // } else 
    if (target.id === 'nivel') {
        this.nivel = target.value;
      }
    
      if (target.type === 'search') {
      this.filtroNome = target.value;
    }

    this.service.pesquisarMeusDiscipulados(this.filtroNome, this.nivel)
      .subscribe(listaTodosDiscipulados => {
        this.listaDiscipulados = listaTodosDiscipulados;
      });
  }

}
