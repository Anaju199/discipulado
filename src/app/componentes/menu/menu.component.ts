import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/paginas/pagamentos/services/user.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isAdmin: boolean = false;
  isUser: boolean = false;

  user$ = this.userService.retornarUser();
  nome = this.userService.retornarNome();
  id = this.userService.retornarId();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const role = this.userService.retornarUserRole();
    this.isAdmin = role === 'admin';
    this.isUser = role === 'user';
  }

  logout() {
    this.userService.logout();
    window.location.href = '/login'
    // this.router.navigate(['/login'])
  }
}
