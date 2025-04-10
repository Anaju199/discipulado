import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Discipulado } from '../../pagamentos/tipos';

@Injectable({
  providedIn: 'root'
})
export class DiscipuladoService {
  private readonly API =  environment.apiUrl + 'discipulados'
  private readonly API_LISTA =  environment.apiUrl + 'lista_discipulados'

  constructor(private http: HttpClient) { }

  listar(filtroDiscipulado: string, nivel: string | null): Observable<Discipulado[]> {

    let params = new HttpParams()

    if(filtroDiscipulado.trim().length > 0){
      params = params.set("nome",filtroDiscipulado)
    }
    
    if(nivel) {
      params = params.set("nivel",nivel)
    }


    const url = `${this.API_LISTA}/`
    return this.http.get<Discipulado[]>(url, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(discipulado: FormData): Observable<Discipulado> {
    const url = `${this.API}/`
    return this.http.post<Discipulado>(url, discipulado)
  }

  editar(id: number, discipulado: FormData): Observable<Discipulado> {
    const url = `${this.API}/${id}/`
    return this.http.put<Discipulado>(url, discipulado )
  }

  excluir(id: number): Observable<Discipulado> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Discipulado>(url)
  }

  buscarPorId(id: number): Observable<Discipulado> {
    const url = `${this.API}/${id}/`
    return this.http.get<Discipulado>(url)
  }
}
