import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangofacturacionComponent } from './rangofacturacion.component';

describe('RangofacturacionComponent', () => {
  let component: RangofacturacionComponent;
  let fixture: ComponentFixture<RangofacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangofacturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangofacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
