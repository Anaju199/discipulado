import { TestBed } from '@angular/core/testing';

import { DiscipuladoService } from './discipulado.service';

describe('DiscipuladoService', () => {
  let service: DiscipuladoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscipuladoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
