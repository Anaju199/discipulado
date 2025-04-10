import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IgrejaService } from '../igreja.service';

@Component({
  selector: 'app-cadastrar-editar-igreja',
  templateUrl: './cadastrar-editar-igreja.component.html',
  styleUrls: ['./cadastrar-editar-igreja.component.css']
})
export class CadastrarEditarIgrejaComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  ano: number = new Date().getFullYear()
  titulo: string = 'Adicione uma nova igreja:'

  constructor(
    private service: IgrejaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id')

    if (id){
      this.titulo = 'Editar igreja:'
      this.service.buscarPorId(parseInt(id!)).subscribe((igreja) => {
        this.id = igreja.id

        this.formulario = this.formBuilder.group({
          id: [igreja.id],
          nome: [igreja.nome,Validators.compose([
            Validators.required
          ])]
        })
      })
    }
  }

  editarIgreja() {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        alert('Igreja editada com sucesso.')
        this.router.navigate(['/listarIgrejas'])
      })
    }
  }

  criarIgreja() {
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        alert('Igreja cadastrada com sucesso.')
        this.router.navigate(['/listarIgrejas'])
      }, error => {
        console.log(error)
        alert('Não foi possivel cadastrar. Verifique se já não existe um igreja com esse nome cadastrado.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  cancelar() {
    this.router.navigate(['/listarIgrejas'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }

}
