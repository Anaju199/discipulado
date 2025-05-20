import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscipuladoService } from '../discipulado.service';
import { CadastroService } from 'src/app/paginas/pagamentos/services/cadastro.service';
import { Usuario, TurmaDiscipulado, AlunoTurmaDiscipulado } from 'src/app/paginas/pagamentos/tipos';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cadastrar-editar-alunos-turma-discipulado',
  templateUrl: './cadastrar-editar-alunos-turma-discipulado.component.html',
  styleUrls: ['./cadastrar-editar-alunos-turma-discipulado.component.css']
})
export class CadastrarEditarAlunosTurmaDiscipuladoComponent implements OnInit {
  turmaId: number = 0;
  turma?: TurmaDiscipulado;
  allStudents: any[] = [];
  allStudentsOriginal: any[] = [];

  turmaStudents: any[] = [];
  turmaStudentsOriginal: any[] = [];
  searchText: string = '';
  selectedStudents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private discipuladoService: DiscipuladoService,
    private cadastroService: CadastroService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.turmaId = parseInt(id);
      this.loadTurma();
    } else {
      this.router.navigate(['/listarMeusDiscipulados']);
    }
  }

  loadTurma() {
    this.discipuladoService.buscarTurmaDiscipulado(this.turmaId).subscribe(
      (turma) => {
        console.log('Turma loaded:', turma);
        this.turma = turma;

        // Carregar todos os estudantes
        this.cadastroService.listar('', false).subscribe(
          (students) => {
            console.log('All students loaded:', students);
            this.allStudents = students;

            // Pegar os alunos da turma com base no ID do discipulo
            if (turma.alunos && turma.alunos.length > 0) {
              this.turmaStudents = turma.alunos.map(alunoTurma => {
                const alunoEncontrado = this.allStudents.find(s => s.id === Number(alunoTurma.discipulo));
                return alunoEncontrado!;
              }).filter(student => student !== undefined);
            } else {
              this.turmaStudents = [];
            }

            // Remover alunos da lista geral que já estão na turma
            this.allStudents = this.allStudents.filter(student =>
              !this.turmaStudents.find(turmaStudent => turmaStudent.id === student.id)
            );

            this.allStudentsOriginal = [...this.allStudents];
            this.turmaStudentsOriginal = [...this.turmaStudents];
          },
          (error) => {
            console.error('Error loading students:', error);
            alert('Erro ao carregar alunos');
          }
        );
      },
      (error) => {
        console.error('Error loading turma:', error);
        alert('Erro ao carregar turma');
        this.router.navigate(['/listarMeusDiscipulados']);
      }
    );
  }

  drop(event: CdkDragDrop<Usuario[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addToTurma(student: Usuario) {
    const index = this.allStudents.indexOf(student);
    if (index > -1) {
      this.allStudents.splice(index, 1);
      this.turmaStudents.push(student);
    }
  }

  removeFromTurma(student: Usuario) {
    const index = this.turmaStudents.indexOf(student);
    if (index > -1) {
      this.turmaStudents.splice(index, 1);
      this.allStudents.push(student);
    }
  }

  filterStudents() {
    const searchLower = this.searchText.toLowerCase().trim();

    if (!searchLower) {
      this.allStudents = [...this.allStudentsOriginal];
      this.turmaStudents = [...this.turmaStudentsOriginal];
      return;
    }

    this.allStudents = this.allStudentsOriginal.filter(
      student => student.nome.toLowerCase().includes(searchLower)
    );

    this.turmaStudents = this.turmaStudentsOriginal.filter(
      student => student.nome.toLowerCase().includes(searchLower)
    );
  }

  atualizarAlunosDaTurma() {
    this.discipuladoService.excluirTodosAlunosTurmaDiscipulado(this.turmaId).subscribe(() => {
      this.turmaStudents.forEach((student) => {
        const alunoData = {
          turma: this.turmaId,
          discipulo: student.id
        };
        this.discipuladoService.criarAlunoTurmaDiscipulado(alunoData).subscribe();
      });
      alert('Alunos atualizados com sucesso!');
      this.router.navigate(['/listarMeusDiscipulados']);
    });
  }

  cancel() {
    this.router.navigate(['/listarMeusDiscipulados']);
  }

  toggleStudentSelection(student: any) {
    const index = this.selectedStudents.indexOf(student);
    if (index >= 0) {
      this.selectedStudents.splice(index, 1);
    } else {
      this.selectedStudents.push(student);
    }
  }

  addSelectedStudents() {
    this.selectedStudents.forEach(student => {
      if (!this.turmaStudents.includes(student)) {
        this.turmaStudents.push(student);
      }
      const idx = this.allStudents.indexOf(student);
      if (idx >= 0) {
        this.allStudents.splice(idx, 1);
      }
    });
    this.selectedStudents = [];
  }

  removeStudent(student: any) {
    this.allStudents.push(student);
    const idx = this.turmaStudents.indexOf(student);
    if (idx >= 0) {
      this.turmaStudents.splice(idx, 1);
    }
  }
}
