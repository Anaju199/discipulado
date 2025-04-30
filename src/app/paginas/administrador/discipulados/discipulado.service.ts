import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlunoTurmaDiscipulado, Discipulado, TurmaDiscipulado } from '../../pagamentos/tipos';

@Injectable({
  providedIn: 'root'
})
export class DiscipuladoService {
  private readonly API =  environment.apiUrl + 'discipulados'
  private readonly API_MINHAS_TURMAS =  environment.apiUrl + 'turma_discipulado'
  private readonly API_ALUNOS_DISCIPULADOS =  environment.apiUrl + 'aluno_turma_discipulado'
  private readonly API_LISTA =  environment.apiUrl + 'lista_discipulados'
  private readonly API_LISTA_TURMA =  environment.apiUrl + 'lista_turma_discipulados'
  private readonly API_LISTA_ALUNO_DISCIPULADOS =  environment.apiUrl + 'lista_aluno_discipulados'

  constructor(private http: HttpClient) { }

  listarDiscipulado(filtroDiscipulado: string, nivel: string | null): Observable<Discipulado[]> {

    let params = new HttpParams()

    if(filtroDiscipulado.trim().length > 0){
      params = params.set("nome",filtroDiscipulado)
    }

    if(nivel) {
      params = params.set("nivel",nivel)
    }


    const url = `${this.API}/`
    return this.http.get<Discipulado[]>(url, {params})
  }

  listarTurma(filtraTurma: string, discipulador: string | null): Observable<TurmaDiscipulado[]> {

    let params = new HttpParams()

    if(filtraTurma.trim().length > 0){
      params = params.set("nome",filtraTurma)
    }

    if(discipulador) {
      params = params.set("discipulador",discipulador)
    }


    const url = `${this.API_LISTA_TURMA}/`
    return this.http.get<TurmaDiscipulado[]>(url, {params})
  }

  listarDiscipuladosAluno(discipulo: string | null): Observable<any[]> {

    let params = new HttpParams()

    if(discipulo) {
      params = params.set("discipulo",discipulo)
    }


    const url = `${this.API_LISTA_ALUNO_DISCIPULADOS}/`
    return this.http.get<any[]>(url, {params})
  }

  pesquisarMeusDiscipulados(filtroDiscipulado: string, nivel: string | null): Observable<TurmaDiscipulado[]> {

    let params = new HttpParams()

    if(filtroDiscipulado.trim().length > 0){
      params = params.set("nome",filtroDiscipulado)
    }

    if(nivel) {
      params = params.set("nivel",nivel)
    }


    const url = `${this.API_LISTA}/`
    return this.http.get<TurmaDiscipulado[]>(url, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  listarTodasTurmas(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API_MINHAS_TURMAS}/`
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


  criarTurmaDiscipulado(discipulado: FormData): Observable<TurmaDiscipulado> {
    const url = `${this.API_MINHAS_TURMAS}/`
    return this.http.post<TurmaDiscipulado>(url, discipulado)
  }

  editarTurmaDiscipulado(id: number, discipulado: any): Observable<TurmaDiscipulado> {
    const url = `${this.API_MINHAS_TURMAS}/${id}/`
    return this.http.put<TurmaDiscipulado>(url, discipulado )
  }

  excluirTurmaDiscipulado(id: number): Observable<TurmaDiscipulado> {
    const url = `${this.API_MINHAS_TURMAS}/${id}/`
    return this.http.delete<TurmaDiscipulado>(url)
  }

  buscarTurmaDiscipulado(id: number): Observable<TurmaDiscipulado> {
    const url = `${this.API_MINHAS_TURMAS}/${id}/`
    return this.http.get<TurmaDiscipulado>(url)
  }

  criarAlunoTurmaDiscipulado(aluno: any): Observable<AlunoTurmaDiscipulado> {
    const url = `${this.API_ALUNOS_DISCIPULADOS}/`
    return this.http.post<AlunoTurmaDiscipulado>(url, aluno)
  }

  editarAlunoTurmaDiscipulado(id: number, aluno: any): Observable<AlunoTurmaDiscipulado> {
    const url = `${this.API_ALUNOS_DISCIPULADOS}/${id}/`
    return this.http.put<AlunoTurmaDiscipulado>(url, aluno )
  }

  excluirAlunoTurmaDiscipulado(id: number): Observable<AlunoTurmaDiscipulado> {
    const url = `${this.API_ALUNOS_DISCIPULADOS}/${id}/`
    return this.http.delete<AlunoTurmaDiscipulado>(url)
  }


  excluirTodosAlunosTurmaDiscipulado(id: number): Observable<AlunoTurmaDiscipulado> {
    const url = `${this.API_ALUNOS_DISCIPULADOS}/remover_alunos_turma/${id}/`
    return this.http.delete<AlunoTurmaDiscipulado>(url)
  }

  buscarAlunoDiscipulado(id: number): Observable<AlunoTurmaDiscipulado> {
    const url = `${this.API_ALUNOS_DISCIPULADOS}/${id}/`
    return this.http.get<AlunoTurmaDiscipulado>(url)
  }
}
