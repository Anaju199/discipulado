import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarMeusDiscipuladosComponent } from './cadastrar-editar-meus-discipulados.component';

describe('CadastrarEditarMeusDiscipuladosComponent', () => {
  let component: CadastrarEditarMeusDiscipuladosComponent;
  let fixture: ComponentFixture<CadastrarEditarMeusDiscipuladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarMeusDiscipuladosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarMeusDiscipuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
