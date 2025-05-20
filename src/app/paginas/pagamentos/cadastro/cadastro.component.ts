import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CadastroService } from '../services/cadastro.service';
import { UserService } from '../services/user.service';
import { IgrejaService } from '../../administrador/igreja/igreja.service';
import { Igreja } from '../tipos';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  alterarSenha: boolean = true;
  cadastro: boolean = true;

  id?: number;
  formulario!: FormGroup;
  formularioEndereco!: FormGroup;
  isAdmin: boolean = false;
  isDiscipulador: boolean = false;
  titulo: string = 'Digite os dados para cadastro:'
  niveis: string[] = []
  igrejas: Igreja[] = []
  discipuladorId: string | null = null;

  constructor(
    private userService: UserService,
    private service: CadastroService,
    private igrejaService: IgrejaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const role = this.userService.retornarUserRole();
    this.isAdmin = role === 'admin';
    this.isDiscipulador = role === 'discipulador';

    this.route.queryParams.subscribe(params => {
      this.alterarSenha = params['alterarSenha'] === 'true';  // Verifica se alterarSenha é 'true'
      this.cadastro = params['cadastro'] === 'true';  // Verifica se alterarSenha é 'true'
    });

    this.formulario = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])],
      telefone: [''],
      senha: ['', Validators.compose([
        Validators.required
      ])],
      senha_2: ['', Validators.compose([
        Validators.required,
        this.equalTo('senha')
      ])],
      administrador: [false],
      nivel: ['Iniciante'],
      igreja: [''],
      discipulador: [false]
    });

    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.titulo = 'Editar informações:'

      this.service.buscarPorId(parseInt(id!)).subscribe((discipulo) => {
        this.id = discipulo.id

        this.formulario = this.formBuilder.group({
          id: [discipulo.id],
          nome: [discipulo.nome, Validators.compose([
            Validators.required,
            Validators.minLength(2)
          ])],
          email: [discipulo.email, Validators.compose([
            Validators.required,
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
          ])],
          telefone: [discipulo.telefone],
          senha: [this.alterarSenha ? '' : discipulo.senha, Validators.compose([
            Validators.required
          ])],
          senha_2: [this.alterarSenha ? '' : discipulo.senha, Validators.compose([
            Validators.required,
            this.equalTo('senha')
          ])],
          administrador: [discipulo.administrador],
          nivel: [discipulo.nivel],
          igreja: [discipulo.igreja],
          discipulador: [discipulo.discipulador]
        });
      })
    }

    this.service.listarNiveis().subscribe(
      niveis => {
        this.niveis = niveis;
    }, error => {
      const firstErrorField = Object.keys(error.error)[0];
      const errorMessage = error.error[firstErrorField][0];

      alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
    });

    this.igrejaService.listar('').subscribe(
      igrejas => {
        this.igrejas = igrejas;
    }, error => {
      const firstErrorField = Object.keys(error.error)[0];
      const errorMessage = error.error[firstErrorField][0];

      alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
    });
  }

  user$ = this.userService.retornarUser();

  cadastrar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('email', this.formulario.get('email')!.value);
      formData.append('telefone', this.formulario.get('telefone')!.value);
      formData.append('senha', this.formulario.get('senha')!.value);
      formData.append('administrador', this.formulario.get('administrador')!.value);
      formData.append('nivel', this.formulario.get('nivel')!.value);
      formData.append('discipulador', this.formulario.get('discipulador')!.value);
      formData.append('igreja', this.formulario.get('igreja')!.value);

      this.service.criar(formData).subscribe(() => {
        alert('Cadastro realizado com sucesso.');
        this.irPara()
      }, error => {
        const firstErrorField = Object.keys(error.error)[0];
        const errorMessage = error.error[firstErrorField][0];

        alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
      });
    } else {
      this.formulario.markAllAsTouched();
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        (firstInvalidControl as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      alert('Formulário Inválido');
    }
  }


  editar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('email', this.formulario.get('email')!.value);
      formData.append('telefone', this.formulario.get('telefone')!.value);
      formData.append('senha', this.formulario.get('senha')!.value);
      formData.append('administrador', this.formulario.get('administrador')!.value);
      formData.append('nivel', this.formulario.get('nivel')!.value);
      formData.append('discipulador', this.formulario.get('discipulador')!.value);
      formData.append('igreja', this.formulario.get('igreja')!.value);

      const id = this.formulario.get('id')!.value;
      this.service.editar(id, formData).subscribe(() => {
        alert('Edição realizada com sucesso.');
        this.irPara();
      }, error => {
        const firstErrorField = Object.keys(error.error)[0];
        const errorMessage = error.error[firstErrorField][0];

        alert(`Erro no campo ${firstErrorField}: ${errorMessage}`);
      });
    } else {
      this.formulario.markAllAsTouched();
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        (firstInvalidControl as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      alert('Formulário Inválido');
    }
  }

  equalTo(otherField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value
      const otherFieldValue = control.root.get(otherField)?.value
      if(fieldValue !== otherFieldValue) {
        return { equalTo: true}
      }
      return null
    }
  }

  irPara() {
    if(this.isAdmin){
      this.router.navigate(['/listarUsuarios'])
    } else {
      this.router.navigate(['/paginaInicial'])
    }
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }


  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    const calcDigito = (base: number) => {
      let soma = 0;
      for (let i = 0; i < base; i++) {
        soma += +cpf[i] * (base + 1 - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const digito1 = calcDigito(9);
    const digito2 = calcDigito(10);

    return digito1 === +cpf[9] && digito2 === +cpf[10];
  }

  cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value;
      if (!cpf) {
        return null;
      }
      return this.validarCPF(cpf) ? null : { cpfInvalido: true };
    };
  }
}
