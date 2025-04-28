import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespostaService } from '../../perguntas/questionario/resposta.service';
import { Resposta } from '../../perguntas/questionario/questionario';
import { Usuario } from '../../../pagamentos/tipos';
import { CadastroService } from 'src/app/paginas/pagamentos/services/cadastro.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  cliente!: Usuario;
  filtroResposta: string = ''
  listaRespostas: Resposta[] = []
  // id: number = 0

  constructor(
    private service: CadastroService,
    private respostaService: RespostaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')

    this.service.buscarPorId(parseInt(id!)).subscribe((cliente) => {
      this.cliente = cliente
    })

    this.respostaService.listar(this.filtroResposta, parseInt(id!)).subscribe((listaRespostas) => {
      this.listaRespostas = listaRespostas
    })
  }

  voltar() {
    this.router.navigate(['/listarAlunos'])
  }

}
