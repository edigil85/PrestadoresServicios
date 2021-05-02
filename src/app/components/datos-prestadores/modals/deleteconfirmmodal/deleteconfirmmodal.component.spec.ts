import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteconfirmmodalComponent } from './deleteconfirmmodal.component';

describe('DeleteconfirmmodalComponent', () => {
  let component: DeleteconfirmmodalComponent;
  let fixture: ComponentFixture<DeleteconfirmmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteconfirmmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteconfirmmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
