import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pergunta } from './questionario';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {
  private readonly API = environment.apiUrl + 'perguntas_discipulado'
  private readonly API_LISTA = environment.apiUrl + 'lista_perguntas_discipulado/'

  constructor(private http: HttpClient) { }

  listar(filtroPesquisa: string, discipulado: string | null): Observable<Pergunta[]> {
    let params = new HttpParams()

    if(filtroPesquisa.length > 0){
        params = params.set("pergunta",filtroPesquisa)
      }

      if(discipulado && discipulado.length > 0){
        params = params.set("discipulado",discipulado)
      }

    return this.http.get<Pergunta[]>(this.API_LISTA, {params})
  }


  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(pergunta: Pergunta): Observable<Pergunta> {
    const url = `${this.API}/`
    return this.http.post<Pergunta>(url, pergunta)
  }

  editar(pergunta: Pergunta): Observable<Pergunta> {
    const url = `${this.API}/${pergunta.id}/`
    return this.http.put<Pergunta>(url, pergunta )
  }

  excluir(id: number): Observable<Pergunta> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Pergunta>(url)
  }

  buscarPorId(id: number): Observable<Pergunta> {
    const url = `${this.API}/${id}/`
    return this.http.get<Pergunta>(url)
  }
}
