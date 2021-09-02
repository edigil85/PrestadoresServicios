import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasRadicadasComponent } from './facturas-radicadas.component';

describe('FacturasRadicadasComponent', () => {
  let component: FacturasRadicadasComponent;
  let fixture: ComponentFixture<FacturasRadicadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturasRadicadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasRadicadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
