import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/paginas/pagamentos/services/user.service';
import { DiscipuladoService } from '../discipulado.service';
import { Discipulado } from 'src/app/paginas/pagamentos/tipos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meus-discipulados',
  templateUrl: './meus-discipulados.component.html',
  styleUrls: ['./meus-discipulados.component.css']
})
export class MeusDiscipuladosComponent implements OnInit {

  listaDiscipulados: Discipulado [] = [];
  link: string = environment.urlImagem
  turma: any

  constructor(
      private userService: UserService,
      private service: DiscipuladoService,
      private router: Router
  ) { }

  ngOnInit(): void {

    const id = this.userService.retornarId();
    // const nivel = this.userService.retornarNivel();

    this.service.listarDiscipuladosAluno(id)
      .subscribe(lista => {
      this.listaDiscipulados = lista.map(item => item.discipulado);
      this.turma = lista.map(item => item.turma);
    });

  }

  irParaQuestionario(id: number, licao: string, nome: string, turma: any) {
    this.router.navigate(['/questionario', id], {
      queryParams: {
        licao: licao,
        discipuladoNome: nome,
        turma: turma
      }
    });
  }
}
