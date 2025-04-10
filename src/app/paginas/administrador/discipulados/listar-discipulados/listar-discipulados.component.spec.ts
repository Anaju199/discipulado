import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDiscipuladosComponent } from './listar-discipulados.component';

describe('ListarDiscipuladosComponent', () => {
  let component: ListarDiscipuladosComponent;
  let fixture: ComponentFixture<ListarDiscipuladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDiscipuladosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDiscipuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
