import { Component, OnInit } from '@angular/core';
import { UserService } from '../pagamentos/services/user.service';
import { Discipulado } from '../pagamentos/tipos';
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

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const role = this.userService.retornarUserRole();
    this.isDiscipulador = role === 'discipulador';
    this.isDiscipulo = role === 'discipulo';
    this.isAdmin = role === 'admin';
  }
}
