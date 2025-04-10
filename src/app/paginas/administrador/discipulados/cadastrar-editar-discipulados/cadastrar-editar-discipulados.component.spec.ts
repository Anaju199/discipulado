import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarDiscipuladosComponent } from './cadastrar-editar-discipulados.component';

describe('CadastrarEditarDiscipuladosComponent', () => {
  let component: CadastrarEditarDiscipuladosComponent;
  let fixture: ComponentFixture<CadastrarEditarDiscipuladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarDiscipuladosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarDiscipuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
