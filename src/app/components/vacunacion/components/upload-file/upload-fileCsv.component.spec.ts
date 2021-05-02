import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileCsvComponent } from './upload-fileCsv.component';

describe('UploadFileComponent', () => {
  let component: UploadFileCsvComponent;
  let fixture: ComponentFixture<UploadFileCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFileCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
