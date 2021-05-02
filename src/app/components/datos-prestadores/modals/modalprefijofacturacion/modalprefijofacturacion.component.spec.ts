import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalprefijofacturacionComponent } from './modalprefijofacturacion.component';

describe('ModalprefijofacturacionComponent', () => {
  let component: ModalprefijofacturacionComponent;
  let fixture: ComponentFixture<ModalprefijofacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalprefijofacturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalprefijofacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
