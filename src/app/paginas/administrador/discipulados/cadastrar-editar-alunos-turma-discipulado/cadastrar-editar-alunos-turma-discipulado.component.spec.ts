import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarAlunosTurmaDiscipuladoComponent } from './cadastrar-editar-alunos-turma-discipulado.component';

describe('CadastrarEditarAlunosTurmaDiscipuladoComponent', () => {
  let component: CadastrarEditarAlunosTurmaDiscipuladoComponent;
  let fixture: ComponentFixture<CadastrarEditarAlunosTurmaDiscipuladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarAlunosTurmaDiscipuladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarAlunosTurmaDiscipuladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
