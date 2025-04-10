import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIgrejaComponent } from './listar-igreja.component';

describe('ListarIgrejaComponent', () => {
  let component: ListarIgrejaComponent;
  let fixture: ComponentFixture<ListarIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarIgrejaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
