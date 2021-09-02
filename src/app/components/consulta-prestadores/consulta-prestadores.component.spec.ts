import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPrestadoresComponent } from './consulta-prestadores.component';

describe('ConsultaPrestadoresComponent', () => {
  let component: ConsultaPrestadoresComponent;
  let fixture: ComponentFixture<ConsultaPrestadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaPrestadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPrestadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
