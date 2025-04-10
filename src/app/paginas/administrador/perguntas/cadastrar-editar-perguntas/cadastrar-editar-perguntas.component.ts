import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerguntaService } from 'src/app/paginas/administrador/perguntas/questionario/pergunta.service';
import { Discipulado } from 'src/app/paginas/pagamentos/tipos';
import { DiscipuladoService } from '../../discipulados/discipulado.service';

@Component({
  selector: 'app-cadastrar-editar-perguntas',
  templateUrl: './cadastrar-editar-perguntas.component.html',
  styleUrls: ['./cadastrar-editar-perguntas.component.css']
})
export class CadastrarEditarPerguntasComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  ano: number = new Date().getFullYear()
  titulo: string = 'Adicione uma nova pergunta:'
  discipulados: Discipulado[] = [];

  constructor(
    private service: PerguntaService,
    private discipuladosService: DiscipuladoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      discipulado: ['', Validators.required],
      pergunta: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id')

    if (id){
      this.titulo = 'Editar pergunta:'
      this.service.buscarPorId(parseInt(id!)).subscribe((pergunta) => {
        this.id = pergunta.id

        this.formulario = this.formBuilder.group({
          id: [pergunta.id],
          discipulado: [pergunta.discipulado,Validators.compose([
            Validators.required
          ])],
          pergunta: [pergunta.pergunta,Validators.compose([
            Validators.required
          ])]
        })
      })
    }

    this.discipuladosService.listar('','').subscribe(
      discipulados => {
        this.discipulados = discipulados;
      },
      error => {
        console.error('Erro ao recuperar discipulados:', error);
      }
    );
  }

  editarPergunta() {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        alert('Pergunta editada com sucesso.')
        this.router.navigate(['/listarPerguntas'])
      })
    }
  }

  criarPergunta() {
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        alert('Pergunta cadastrada com sucesso.')
        this.router.navigate(['/listarPerguntas'])
      }, error => {
        console.log(error)
        alert('Não foi possivel cadastrar. Verifique se já não existe um pergunta com esse nome cadastrado.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  cancelar() {
    this.router.navigate(['/listarPerguntas'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }

}
