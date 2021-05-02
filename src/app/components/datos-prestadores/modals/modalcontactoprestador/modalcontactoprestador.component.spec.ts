import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcontactoprestadorComponent } from './modalcontactoprestador.component';

describe('ModalcontactoprestadorComponent', () => {
  let component: ModalcontactoprestadorComponent;
  let fixture: ComponentFixture<ModalcontactoprestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalcontactoprestadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcontactoprestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
