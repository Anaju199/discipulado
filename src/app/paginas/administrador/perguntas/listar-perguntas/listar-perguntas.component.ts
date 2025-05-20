import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pergunta } from 'src/app/paginas/administrador/perguntas/questionario/questionario';
import { PerguntaService } from 'src/app/paginas/administrador/perguntas/questionario/pergunta.service';
import { DiscipuladoService } from '../../discipulados/discipulado.service';
import { Discipulado } from 'src/app/paginas/pagamentos/tipos';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.css']
})
export class ListarPerguntasComponent implements OnInit {
  listaPerguntas: Pergunta[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroPergunta: string = ''
  discipulado: string = ''
  mes: string = ''
  ano: number = -1
  discipulados: Discipulado[] = [];

  constructor(
    private service: PerguntaService,
    private discipuladosService: DiscipuladoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPerguntas()

    this.discipuladosService.listarDiscipulado('','').subscribe(
      discipulados => {
        this.discipulados = discipulados;
      },
      error => {
        console.error('Erro ao recuperar discipulados:', error);
      }
    );
  }

  carregarPerguntas(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaPerguntas = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }

  // carregarPerguntas() {
  //   this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
  //     this.listaPerguntas = response.results.map((pergunta: Pergunta) => {
  //       return {
  //         ...pergunta,
  //         // Mantém a data no formato de string, pois já está em ISO
  //         dataNascimento: pergunta.data_nascimento
  //       };
  //     });
  //     this.totalPaginas = Math.ceil(response.count / this.itensPorPagina);
  //   });
  // }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarPerguntas();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarPerguntas();
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

  adicionar() {
    this.router.navigate(['/cadastrarEditarPergunta'])
  }


  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')){
      this.service.excluir(id).subscribe(() => {
        alert('Pergunta excluido com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  pesquisarPergunta(event: Event){
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    if (target.id === 'discipulado') {
      this.discipulado = target.value;
    }
    if (target.type === 'search') {
      this.filtroPergunta = target.value;
    }

    this.service.listar(this.filtroPergunta, this.discipulado)
      .subscribe(listaTodasPerguntas => {
        this.listaPerguntas = listaTodasPerguntas;

      });
  }
}
