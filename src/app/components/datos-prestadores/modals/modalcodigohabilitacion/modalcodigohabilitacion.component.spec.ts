import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcodigohabilitacionComponent } from './modalcodigohabilitacion.component';

describe('ModalcodigohabilitacionComponent', () => {
  let component: ModalcodigohabilitacionComponent;
  let fixture: ComponentFixture<ModalcodigohabilitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalcodigohabilitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcodigohabilitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
