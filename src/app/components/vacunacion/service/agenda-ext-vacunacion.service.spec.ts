import { TestBed } from '@angular/core/testing';

import { AgendaExtVacunacionService } from './agenda-ext-vacunacion.service';

describe('AgendaExtVacunacionService', () => {
  let service: AgendaExtVacunacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaExtVacunacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
