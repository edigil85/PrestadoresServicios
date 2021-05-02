import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaExternoVacunacionComponent } from './agenda-externo-vacunacion.component';

describe('AgendaExternoVacunacionComponent', () => {
  let component: AgendaExternoVacunacionComponent;
  let fixture: ComponentFixture<AgendaExternoVacunacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaExternoVacunacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaExternoVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
