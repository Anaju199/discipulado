import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMeusDiscipuladosComponent } from './listar-meus-discipulados.component';

describe('ListarMeusDiscipuladosComponent', () => {
  let component: ListarMeusDiscipuladosComponent;
  let fixture: ComponentFixture<ListarMeusDiscipuladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMeusDiscipuladosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMeusDiscipuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
