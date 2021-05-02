import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsedesComponent } from './modalsedes.component';

describe('ModalsedesComponent', () => {
  let component: ModalsedesComponent;
  let fixture: ComponentFixture<ModalsedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsedesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
