import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private readonly API = environment.apiUrl + 'usuario_discipulado'
  private readonly API_LISTA_NIVEIS = environment.apiUrl + 'lista_niveis_discipulo'
  private readonly API_LISTA = environment.apiUrl + 'lista_usuario_discipulado'

  constructor(private http: HttpClient) { }

  listar(filtroUsuario: string, discipulador: boolean): Observable<Usuario[]> {

    let params = new HttpParams()

    if(filtroUsuario.trim().length > 0){
      params = params.set("nome",filtroUsuario)
    }

    if(discipulador){
      params = params.set("discipulador","True")
    }

    const url = `${this.API_LISTA}/`
    return this.http.get<Usuario[]>(url, {params})
  }

  listarUsuario(id?: string): Observable<Usuario[]> {

    let params = new HttpParams()

    if (id) {
      params = params.set("id", id);
    }

    const url = `${this.API_LISTA}/`
    return this.http.get<Usuario[]>(url, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
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

  criar(usuario: FormData): Observable<Usuario> {
    let url =  `${this.API}/`
    return this.http.post<Usuario>(url, usuario);
  }

  editar(id: number, usuario: FormData): Observable<Usuario> {
    let url =  `${this.API}/${id}/`
    return this.http.put<Usuario>(url, usuario)
  }

  excluir(id: number): Observable<Usuario> {
    let url =  `${this.API}/${id}/`
    return this.http.delete<Usuario>(url)
  }

  buscarPorId(id: number): Observable<Usuario> {
    let url =  `${this.API}/${id}/`
    return this.http.get<Usuario>(url)
  }

}
