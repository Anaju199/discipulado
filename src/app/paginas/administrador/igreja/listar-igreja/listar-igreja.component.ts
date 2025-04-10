import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Igreja } from 'src/app/paginas/pagamentos/tipos';
import { IgrejaService } from '../igreja.service';

@Component({
  selector: 'app-listar-igreja',
  templateUrl: './listar-igreja.component.html',
  styleUrls: ['./listar-igreja.component.css']
})
export class ListarIgrejaComponent implements OnInit {

  listaIgrejas: Igreja[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroNome: string = ''
  cliente: string = 'True'
  adm: string = 'False'

  constructor(
    private service: IgrejaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarIgrejas()
  }

  carregarIgrejas(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaIgrejas = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarIgrejas();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarIgrejas();
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
        alert('Igreja excluido com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  pesquisarIgreja(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    if (target.type === 'search') {
      this.filtroNome = target.value;
    }

    this.service.listar(this.filtroNome)
      .subscribe(listaTodosIgrejas => {
        this.listaIgrejas = listaTodosIgrejas;
      });
  }

}
