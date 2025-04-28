import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscipuladoService } from '../discipulado.service';
import { CadastroService } from 'src/app/paginas/pagamentos/services/cadastro.service';
import { Discipulado, Usuario } from 'src/app/paginas/pagamentos/tipos';

@Component({
  selector: 'app-cadastrar-editar-meus-discipulados',
  templateUrl: './cadastrar-editar-meus-discipulados.component.html',
  styleUrls: ['./cadastrar-editar-meus-discipulados.component.css']
})
export class CadastrarEditarMeusDiscipuladosComponent implements OnInit {

  id?: number;
  formulario!: FormGroup;
  ano: number = new Date().getFullYear();
  titulo: string = 'Adicione uma nova discipulado:';
  discipuladores: Usuario[] = [];
  discipulados: Discipulado[] = [];

  constructor(
    private service: DiscipuladoService,
    private usuarioService: CadastroService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome_turma: ['', Validators.required],
      discipulador: ['', Validators.required],
      discipulado: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_fim: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.titulo = 'Editar discipulado:';
      this.service.buscarMeusDiscipulado(parseInt(id!)).subscribe((discipulado) => {
        this.id = discipulado.id;
    
        this.formulario = this.formBuilder.group({
          id: [discipulado.id],
          nome_turma: [discipulado.nome_turma, Validators.required],
          discipulador: [discipulado.discipulador, Validators.required],
          discipulado: [discipulado.discipulado, Validators.required],
          data_inicio: [discipulado.data_inicio, Validators.required],
          data_fim: [discipulado.data_fim]
        });
      });
    }    

    this.usuarioService.listar('', true).subscribe(
      discipuladores => {
        this.discipuladores = discipuladores;
      },
      error => {
        const firstErrorField = Object.keys(error.error)[0];
        const errorMessage = error.error[firstErrorField][0];
        alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
      }
    );

    this.service.listar('', '').subscribe(
      discipulados => {
        this.discipulados = discipulados;
      },
      error => {
        const firstErrorField = Object.keys(error.error)[0];
        const errorMessage = error.error[firstErrorField][0];
        alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
      }
    );
  }

  criarDiscipulado() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome_turma', this.formulario.get('nome_turma')!.value);
      formData.append('discipulador', this.formulario.get('discipulador')!.value);
      formData.append('discipulado', this.formulario.get('discipulado')!.value);
      formData.append('data_inicio', this.formulario.get('data_inicio')!.value);
      formData.append('data_fim', this.formulario.get('data_fim')!.value);
      
      this.service.criarTurmaDiscipulado(formData).subscribe(() => {
        alert('Turma de discipulado criada com sucesso!');
        this.router.navigate(['/listarMeusDiscipulados']);
      }, error => {
        const firstErrorField = Object.keys(error.error || {})[0];
        const errorMessage = error.error?.[firstErrorField]?.[0] || 'Erro ao editar discipulado';
        alert(`Erro: ${errorMessage}`);
      });
    }  
  }  

  editarDiscipulado() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome_turma', this.formulario.get('nome_turma')!.value);
      formData.append('discipulador', this.formulario.get('discipulador')!.value);
      formData.append('discipulado', this.formulario.get('discipulado')!.value);
      formData.append('data_inicio', this.formulario.get('data_inicio')!.value);
      formData.append('data_fim', this.formulario.get('data_fim')!.value);
      
      const id = this.formulario.get('id')!.value;
      this.service.editarTurmaDiscipulado(id, formData).subscribe(() => {
        alert('Turma de discipulado atualizada com sucesso!');
        this.router.navigate(['/listarMeusDiscipulados']);
      }, error => {
        const firstErrorField = Object.keys(error.error || {})[0];
        const errorMessage = error.error?.[firstErrorField]?.[0] || 'Erro ao editar discipulado';
        alert(`Erro: ${errorMessage}`);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarMeusDiscipulados']);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao_forms';
    } else {
      return 'botao__desabilitado';
    }
  }

  processarArquivo(event: any) {
    const file: File = event.files[0];
    this.formulario.patchValue({ foto: file });
    this.formulario.get('foto')!.updateValueAndValidity();
  }
}
