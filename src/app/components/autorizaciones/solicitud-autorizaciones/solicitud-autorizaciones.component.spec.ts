import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAutorizacionesComponent } from './solicitud-autorizaciones.component';

describe('SolicitudAutorizacionesComponent', () => {
  let component: SolicitudAutorizacionesComponent;
  let fixture: ComponentFixture<SolicitudAutorizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudAutorizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudAutorizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
