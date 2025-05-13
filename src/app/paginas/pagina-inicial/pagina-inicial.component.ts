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

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {

  }
}
