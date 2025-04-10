import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../pagamentos/tipos';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly API =  environment.apiUrl + 'discipulos'
  private readonly API_LISTA =  environment.apiUrl + 'lista_discipulos'

  constructor(private http: HttpClient) { }

  listar(filtroUsuario: string): Observable<Usuario[]> {

    let params = new HttpParams()

    if(filtroUsuario.trim().length > 0){
      params = params.set("nome",filtroUsuario)
    }

    return this.http.get<Usuario[]>(this.API_LISTA, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(Usuario: FormData): Observable<Usuario> {
    const url = `${this.API}/`
    return this.http.post<Usuario>(url, Usuario)
  }

  editar(id: number, Usuario: FormData): Observable<Usuario> {
    const url = `${this.API}/${id}/`
    return this.http.put<Usuario>(url, Usuario )
  }

  excluir(id: number): Observable<Usuario> {
    const url = `${this.API}/${id}`
    return this.http.delete<Usuario>(url)
  }

  buscarPorId(id: number): Observable<Usuario> {
    const url = `${this.API}/${id}/`
    return this.http.get<Usuario>(url)
  }
}
