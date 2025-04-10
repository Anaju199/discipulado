import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private readonly API_DISCIPULOS = environment.apiUrl + 'discipulos'
  private readonly API_DISCIPULADORES = environment.apiUrl + 'discipuladores'
  private readonly API_LISTA_NIVEIS = environment.apiUrl + 'lista_niveis_discipulo'
  private readonly API_LISTA = environment.apiUrl + 'lista_discipulados'
  private readonly API_LISTA_DISCIPULOS = environment.apiUrl + 'lista_discipulos'

  constructor(private http: HttpClient) { }

  listarUsuario(id?: string): Observable<Usuario[]> {

    let params = new HttpParams()

    if (id) {
      params = params.set("id", id);
    }

    const url = `${this.API_LISTA}/`
    return this.http.get<Usuario[]>(url, {params})
  }

  listarTodos(): Observable<Usuario[]> {
    let params = new HttpParams()

    const url = `${this.API_LISTA}/`
    return this.http.get<Usuario[]>(url)
  }

  listarNiveis(): Observable<string[]> {
    let params = new HttpParams()

    const url = `${this.API_LISTA_NIVEIS}/`
    return this.http.get<string[]>(url)
  }


  buscarCadastro(): Observable<Usuario> {
    const url = `${this.API_LISTA}/`
    return this.http.get<Usuario>(url);
  }

  criar(usuario: FormData, adm: boolean): Observable<Usuario> {
    let url = ''; // Declarar fora do if
  
    if (adm) {
      url = `${this.API_DISCIPULADORES}/`;
    } else {
      url = `${this.API_DISCIPULOS}/`;
    }
  
    return this.http.post<Usuario>(url, usuario);
  }

  editar(id: number, usuario: FormData, adm: boolean): Observable<Usuario> {

    let url = ''; // Declarar fora do if
  
    if (adm) {
      url = `${this.API_DISCIPULADORES}/${id}/`;
    } else {
      url = `${this.API_DISCIPULOS}/${id}/`;
    }
    
    return this.http.put<Usuario>(url, usuario)
  }

  excluir(id: number, adm: boolean): Observable<Usuario> {
   
    let url = ''; // Declarar fora do if
  
    if (adm) {
      url = `${this.API_DISCIPULADORES}/${id}/`;
    } else {
      url = `${this.API_DISCIPULOS}/${id}/`;
    }
    
    return this.http.delete<Usuario>(url)
  }

  buscarPorId(id: number, adm: boolean): Observable<Usuario> {
    
    let url = ''; // Declarar fora do if
  
    if (adm) {
      url = `${this.API_DISCIPULADORES}/${id}/`;
    } else {
      url = `${this.API_DISCIPULOS}/${id}/`;
    }
    
    return this.http.get<Usuario>(url)
  }

}
