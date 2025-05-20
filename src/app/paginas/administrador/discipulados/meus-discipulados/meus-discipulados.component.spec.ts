import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusDiscipuladosComponent } from './meus-discipulados.component';

describe('MeusDiscipuladosComponent', () => {
  let component: MeusDiscipuladosComponent;
  let fixture: ComponentFixture<MeusDiscipuladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusDiscipuladosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusDiscipuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
