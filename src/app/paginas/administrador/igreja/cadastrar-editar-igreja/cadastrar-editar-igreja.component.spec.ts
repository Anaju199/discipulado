import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarIgrejaComponent } from './cadastrar-editar-igreja.component';

describe('CadastrarEditarIgrejaComponent', () => {
  let component: CadastrarEditarIgrejaComponent;
  let fixture: ComponentFixture<CadastrarEditarIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarIgrejaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
