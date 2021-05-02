import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigohabilitacionComponent } from './codigohabilitacion.component';

describe('CodigohabilitacionComponent', () => {
  let component: CodigohabilitacionComponent;
  let fixture: ComponentFixture<CodigohabilitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigohabilitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigohabilitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
