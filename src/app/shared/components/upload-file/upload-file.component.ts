import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, OnChanges {

  selectedFiles: FileList;
  file: File = null;
  progressInfos = [];
  message = '';
  exist = false;
  valid = 0;
  nameArchive = 'Seleccionar Archivo';
  @Output() data = new EventEmitter<File>();
  @Output() delete = new EventEmitter();
  @Input() class: string;
  @Input() progress: boolean;
  @Input() fileDelete: boolean;
  @Input() fileNoRequired: boolean;


  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(private utilService: UtilService,) { }

  ngOnInit(): void {
  }

  selectFiles(event): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.validateArchive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.progress !== undefined && !this.progress) {
      this.progressInfos = [];
    }

  }

  validateArchive(): void {
    this.message = '';
      if (this.selectedFiles.length === 1) {
        this.file = this.selectedFiles[0];

        const ext = this.file.name.split('.').pop();

        // Se valida la extencion
        if (this.validateExt(ext)) {
          if (this.validateSize(this.file.size)) {
            this.valid = 1;
            this.progressInfos[0] = { value: 100, fileName: this.selectedFiles[0].name };
            this.exist = true;
            this.nameArchive = this.file.name;
            this.data.emit(this.selectedFiles[0]);
          } else {
            this.deleteFile();
            this.message = 'Tamaño no permitido';
            this.valid = 2;
          }
        } else {
          this.deleteFile();
          this.message = 'El archivo no tiene la extensión adecuada';
          this.valid = 2;
        }

      } else if(this.exist == false){
        this.deleteFile();
        this.message = 'Seleccione solo un archivo:';
        this.valid = 2;
      }
  }

  validateExt(ext) {
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'tiff':
      case 'tif':
      case 'pdf':
        return true;
      default:
        return false;
    }
  }

  validateSize(size) {
    if (size <= 4000000) {
      return true;
    }
    return false;
  }

  deleteFile() {
    this.exist = false;
    if(this.myInputVariable != null || this.myInputVariable != undefined){
        this.myInputVariable.nativeElement.value = "";
        this.class = 'clinic-history';
    }
    this.nameArchive = 'Seleccionar Archivo';
    this.delete.emit();
  }

  

  get validInput() {

    if(this.progress && this.file != null){
      this.nameArchive = this.file.name;
    }else{
      this.nameArchive = 'Seleccionar Archivo';
    }

    if (this.valid === 2 || (this.fileDelete != undefined && this.fileDelete)) {
      this.exist = false;
      if(this.myInputVariable != null || this.myInputVariable != undefined){
        this.myInputVariable.nativeElement.value = "";
        return true;
      }else{
        return false;
      }
    }
 
    if (this.fileNoRequired != undefined && this.fileNoRequired) {
      this.exist = false;
      if(this.myInputVariable != null || this.myInputVariable != undefined){
        this.myInputVariable.nativeElement.value = "";
       }
    }
    return false;
  }



}
