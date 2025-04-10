import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from 'src/app/componentes/menu/menu.component';
import { UserService } from '../pagamentos/services/user.service';
import { Discipulado } from '../pagamentos/tipos';
import { DiscipuladoService } from '../administrador/discipulados/discipulado.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  isDiscipulador: boolean = false;
  isDiscipulo: boolean = false;
  isAdmin: boolean = false;

  listaDiscipulados: Discipulado [] = [];
  link: string = environment.urlImagem

  constructor(
    private userService: UserService,
    private service: DiscipuladoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const role = this.userService.retornarUserRole();
    this.isDiscipulador = role === 'discipulador';
    this.isDiscipulo = role === 'discipulo';
    this.isAdmin = role === 'admin';
    
    const nivel = this.userService.retornarNivel();

    this.service.listar('', nivel)
    .subscribe(listaTodosDiscipulados => {
      this.listaDiscipulados = listaTodosDiscipulados;
    });
  }
}
