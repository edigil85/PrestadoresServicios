import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlosasComponent } from './glosas.component';

describe('GlosasComponent', () => {
  let component: GlosasComponent;
  let fixture: ComponentFixture<GlosasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlosasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlosasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
