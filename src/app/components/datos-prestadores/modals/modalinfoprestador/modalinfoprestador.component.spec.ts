import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalinfoprestadorComponent } from './modalinfoprestador.component';

describe('ModalinfoprestadorComponent', () => {
  let component: ModalinfoprestadorComponent;
  let fixture: ComponentFixture<ModalinfoprestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalinfoprestadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalinfoprestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
