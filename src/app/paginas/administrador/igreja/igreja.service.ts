import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Igreja } from '../../pagamentos/tipos';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {
  private readonly API =  environment.apiUrl + 'igrejas'
  private readonly API_LISTA =  environment.apiUrl + 'lista_igrejas'

  constructor(private http: HttpClient) { }

  listar(filtroIgreja: string): Observable<Igreja[]> {

    let params = new HttpParams()

    if(filtroIgreja.trim().length > 0){
      params = params.set("nome",filtroIgreja)
    }

    const url = `${this.API_LISTA}/`
    return this.http.get<Igreja[]>(url, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(igreja: FormData): Observable<Igreja> {
    const url = `${this.API}/`
    return this.http.post<Igreja>(url, igreja)
  }

  editar(igreja: Igreja): Observable<Igreja> {
    const url = `${this.API}/${igreja.id}/`
    return this.http.put<Igreja>(url, igreja )
  }

  excluir(id: number): Observable<Igreja> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Igreja>(url)
  }

  buscarPorId(id: number): Observable<Igreja> {
    const url = `${this.API}/${id}/`
    return this.http.get<Igreja>(url)
  }
}
