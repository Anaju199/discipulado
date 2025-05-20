import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DiscipuladoService } from '../discipulado.service';
import { Discipulado } from 'src/app/paginas/pagamentos/tipos';
import { UserService } from 'src/app/paginas/pagamentos/services/user.service';
import { environment } from 'src/environments/environment';
import { CadastroService } from 'src/app/paginas/pagamentos/services/cadastro.service';

@Component({
  selector: 'app-listar-discipulados',
  templateUrl: './listar-discipulados.component.html',
  styleUrls: ['./listar-discipulados.component.css']
})
export class ListarDiscipuladosComponent implements OnInit {

  listaDiscipulados: Discipulado[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroNome: string = ''
  cliente: string = 'True'
  nivel: string = ''
  niveis: string[] = [];

  link: string = environment.urlImagem

  constructor(
    public userService: UserService,
    private service: DiscipuladoService,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroService.listarNiveis().subscribe(
      niveis => {
        this.niveis = niveis;
      },
      error => {
        console.error('Erro ao recuperar niveis:', error);
      }
    );

    this.carregarDiscipulados()
  }

  carregarDiscipulados(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaDiscipulados = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }

  // proximaPagina(): void {
  //   if (this.paginaAtual < this.totalPaginas) {
  //     this.paginaAtual++;
  //     this.carregarDiscipulados();
  //   }
  // }

  // paginaAnterior(): void {
  //   if (this.paginaAtual > 1) {
  //     this.paginaAtual--;
  //     this.carregarDiscipulados();
  //   }
  // }

  // habilitarBotao(direcao: string): string {
  //   if (direcao === 'anterior' && this.paginaAtual === 1) {
  //     return 'botao_pag_desabilitado';
  //   }
  //   if (direcao === 'proxima' && this.paginaAtual === this.totalPaginas) {
  //     return 'botao_pag_desabilitado';
  //   }
  //   return 'botao_pag';
  // }

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

  perguntas() {
    this.router.navigate(['/listarPerguntas'])
  }

  pesquisarDiscipulado(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    // if (target.type === 'select-one') {
    //   if (target.id === 'cliente') {
    //     this.cliente = target.value;
    //   } else
    // } else
    if (target.type === 'select-one') {
      if (target.id === 'nivel') {
          this.nivel = target.value;
      }
    }

    console.log('nuvl',this.nivel)

    if (target.type === 'search') {
      this.filtroNome = target.value;
    }

    this.service.listarDiscipulado(this.filtroNome, this.nivel)
      .subscribe(listaTodosDiscipulados => {
        this.listaDiscipulados = listaTodosDiscipulados;
      });
  }




}
