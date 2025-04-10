import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscipuladoService } from '../discipulado.service';
import { CadastroService } from 'src/app/paginas/pagamentos/services/cadastro.service';

@Component({
  selector: 'app-cadastrar-editar-discipulados',
  templateUrl: './cadastrar-editar-discipulados.component.html',
  styleUrls: ['./cadastrar-editar-discipulados.component.css']
})
export class CadastrarEditarDiscipuladosComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  ano: number = new Date().getFullYear()
  titulo: string = 'Adicione uma nova discipulado:'
  niveis: string[] = []

  constructor(
    private service: DiscipuladoService,
    private cadastroService: CadastroService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      licao: [''],
      nivel: ['Iniciante'],
      proximoEstudo: [''],
      foto: [null]
    });

    const id = this.route.snapshot.paramMap.get('id')

    if (id){
      this.titulo = 'Editar discipulado:'
      this.service.buscarPorId(parseInt(id!)).subscribe((discipulado) => {
        this.id = discipulado.id

        this.formulario = this.formBuilder.group({
          id: [discipulado.id],
          nome: [discipulado.nome,Validators.compose([
            Validators.required
          ])],
          licao: [discipulado.licao],
          nivel: [discipulado.nivel],
          proximoEstudo: [discipulado.proximoEstudo],
          foto: [discipulado.foto]
        })
      })
    }

    this.cadastroService.listarNiveis().subscribe(
      niveis => {
        this.niveis = niveis;
    }, error => {
      const firstErrorField = Object.keys(error.error)[0]; 
      const errorMessage = error.error[firstErrorField][0]; 
      
      alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
    });

  }

  editarDiscipulado() {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('licao', this.formulario.get('licao')!.value);
      formData.append('nivel', this.formulario.get('nivel')!.value);
      formData.append('proximoEstudo', this.formulario.get('proximoEstudo')!.value);

      console.log(this.formulario.get('foto')!.value)
      const foto = this.formulario.get('foto')!.value;
      if (foto instanceof File) {
        formData.append('foto', foto);
      }

      const id = this.formulario.get('id')!.value;
      this.service.editar(id, formData).subscribe(() => {
        alert('Discipulado editado com sucesso.')
        this.router.navigate(['/listarDiscipulados'])
      }, error => {
        const firstErrorField = Object.keys(error.error)[0]; 
        const errorMessage = error.error[firstErrorField][0]; 
        
        alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
      });
    }
  }

  criarDiscipulado() {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('licao', this.formulario.get('licao')!.value);
      formData.append('nivel', this.formulario.get('nivel')!.value);
      formData.append('proximoEstudo', this.formulario.get('proximoEstudo')!.value);

      console.log(this.formulario.get('foto')!.value)
      const foto = this.formulario.get('foto')!.value;
      if (foto instanceof File) {
        formData.append('foto', foto);
      }

      this.service.criar(formData).subscribe(() => {
        alert('Discipulado cadastrado com sucesso.')
        this.router.navigate(['/listarDiscipulados'])
      }, error => {
        const firstErrorField = Object.keys(error.error)[0]; 
        const errorMessage = error.error[firstErrorField][0]; 
        
        alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  cancelar() {
    this.router.navigate(['/listarDiscipulados'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }

  processarArquivo(event: any) {
    const file: File = event.files[0];
    this.formulario.patchValue({ foto: file });
    this.formulario.get('foto')!.updateValueAndValidity();
  }
}
