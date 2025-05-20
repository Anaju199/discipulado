import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerguntaService } from 'src/app/paginas/administrador/perguntas/questionario/pergunta.service';
import { Pergunta, Resposta } from './questionario';
import { RespostaService } from './resposta.service';
import { UserService } from '../../../pagamentos/services/user.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  id?: number;
  formulario!: FormGroup;
  perguntas: Pergunta[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  listaRespostas: Resposta[] = [];
  usuarioId = this.userService.retornarId();
  licao: string = ''
  discipuladoNome: string = ''
  turma: any

  constructor(
    private perguntaService: PerguntaService,
    private service: RespostaService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.licao = params['licao'];
      this.discipuladoNome = params['discipuladoNome'];
      this.turma = params['turma'];
    });

    this.formulario = this.formBuilder.group({
      perguntas: this.formBuilder.array([]) // FormArray para perguntas e respostas
    });

    // Primeiro, verifica se existem respostas anteriores
    this.verificaResposta(this.usuarioId!).then((respostasExistentes) => {
      // Se houver respostas, lista as perguntas e preenche o formulário com as respostas anteriores
      this.listarPerguntas(respostasExistentes);
    });
  }

  get perguntasArray(): FormArray {
    return this.formulario.get('perguntas') as FormArray;
  }

  listarPerguntas(respostasExistentes: Resposta[] = []): void {
    const id = this.route.snapshot.paramMap.get('id')

    this.perguntaService.listar('', id).subscribe(
      response => {
        this.perguntas = response;
        this.popularPerguntasNoFormulario(respostasExistentes);
      },
      error => {
        console.error('Erro ao recuperar perguntas:', error);
      }
    );
  }

  popularPerguntasNoFormulario(respostasExistentes: Resposta[]): void {
    this.perguntas.forEach(pergunta => {
      const respostaEncontrada = respostasExistentes.find(r => r.pergunta === pergunta.id);
      this.perguntasArray.push(this.criarPergunta(pergunta, respostaEncontrada?.resposta || ''));
    });
  }

  criarPergunta(pergunta: any, resposta: string): FormGroup {
    return this.formBuilder.group({
      id: [pergunta.id], // ID da pergunta
      pergunta: [pergunta.pergunta], // Texto da pergunta
      resposta: [resposta, Validators.required] // Resposta associada à pergunta
    });
  }

  criarResposta() {
    if (this.formulario.valid) {
      const respostas: Resposta[] = this.formulario.value.perguntas.map((item: any) => {
        return {
          id: null,
          usuario: this.usuarioId,
          turma: this.turma,
          pergunta: item.id,
          resposta: item.resposta
        };
      });

      // Para cada resposta, verifica se já existe
      const requisicoes = respostas.map(resposta => {
        return this.service
          .buscarResposta(resposta.usuario, resposta.turma, resposta.pergunta)
          .pipe(
            switchMap(respostaExistente => {
              if (respostaExistente) {
                resposta.id = respostaExistente.id;
                return this.service.editar(resposta);
              } else {
                // Cria nova
                return this.service.criar(resposta);
              }
            })
          );
      });

      // Executa todas
      forkJoin(requisicoes).subscribe(() => {
        alert('Respostas processadas com sucesso.');
        this.router.navigate(['/paginaInicial']);
      }, error => {
        const firstErrorField = Object.keys(error.error)[0];
        const errorMessage = error.error[firstErrorField][0];
        alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
      });
    } else {
      this.formulario.markAllAsTouched();
      alert('Formulário Inválido');
    }
  }


  cancelar() {
    this.router.navigate(['/listarPerguntas']);
  }

  verificaResposta(usuarioId: string): Promise<Resposta[]> {
    return new Promise((resolve) => {
      this.service.listar('', parseInt(usuarioId!), 0).subscribe((listaRespostas) => {
        this.listaRespostas = listaRespostas;
        resolve(this.listaRespostas); // Resolve com as respostas existentes
      });
    });
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao_forms';
    } else {
      return 'botao__desabilitado';
    }
  }

}
