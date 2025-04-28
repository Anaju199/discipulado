import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/paginas/pagamentos/tipos';
import { CadastroService } from 'src/app/paginas/pagamentos/services/cadastro.service';

@Component({
  selector: 'app-listar-alunos',
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.css']
})
export class ListarAlunosComponent implements OnInit {

  listaUsuarios: Usuario[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroNome: string = ''
  cliente: string = 'True'
  adm: string = 'False'

  constructor(
    private service: CadastroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarUsuarios()
  }

  carregarUsuarios(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaUsuarios = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarUsuarios();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarUsuarios();
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

  // excluir(id: number) {
  //   if (confirm('Tem certeza que deseja excluir?')){
  //     this.service.excluir(id).subscribe(() => {
  //       alert('Usuario excluido com sucesso.')
  //       this.recarregarComponente()
  //     })
  //   }
  // }

  // recarregarComponente(){
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false
  //   this.router.onSameUrlNavigation = 'reload'
  //   this.router.navigate([this.router.url])
  // }

  pesquisarUsuario(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    if (target.type === 'search') {
      this.filtroNome = target.value;
    }

    this.service.listar(this.filtroNome, false)
      .subscribe(listaTodosUsuarios => {
        this.listaUsuarios = listaTodosUsuarios;
      });
  }

}
