import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<Usuario | null>(null);
  id!: number;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  private decodificarJWT(): void {
    const token = this.tokenService.retornarToken();
    if (token) {
      const user = jwt_decode(token) as Usuario;
      this.userSubject.next(user);
    }
  }

  retornarUser(): Observable<Usuario | null> {
    return this.userSubject.asObservable();
  }

  // ===================== ROLES =====================

  setUserRole(role: string): void {
    localStorage.setItem('role', role);
  }

  retornarUserRole(): string {
    // Retorna o papel do usuário salvo localmente (ex: 'admin', 'discipulo', 'discipulador')
    return localStorage.getItem('role') || '';
  }

  get isAdmin(): boolean {
    return this.retornarUserRole() === 'admin';
  }

  get isDiscipulo(): boolean {
    return this.retornarUserRole() === 'discipulo';
  }

  get isDiscipulador(): boolean {
    return this.retornarUserRole() === 'discipulador';
  }

  // ===================== DADOS DO USUÁRIO =====================

  setId(id: number): void {
    localStorage.setItem('id', id.toString());
  }

  retornarId(): string | null {
    return localStorage.getItem('id');
  }

  setNome(nome: string): void {
    localStorage.setItem('nome', nome);
  }

  retornarNome(): string | null {
    return localStorage.getItem('nome');
  }

  setNivel(nivel: string): void {
    localStorage.setItem('nivel', nivel);
  }

  retornarNivel(): string | null {
    return localStorage.getItem('nivel');
  }

  // ===================== TOKEN =====================

  salvarToken(token: string): void {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  // ===================== AUTENTICAÇÃO =====================

  logout(): void {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
    localStorage.removeItem('nome');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('nivel');
  }

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }
}
