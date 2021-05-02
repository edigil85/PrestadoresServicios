import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-uploadCsv-file',
  templateUrl: './upload-fileCsv.component.html',
  styleUrls: ['./upload-fileCsv.component.css']
})
export class UploadFileCsvComponent implements OnInit, OnChanges {

  selectedFiles: FileList;
  file: File = null;
  progressInfos = [];
  message = '';
  exist = false;
  valid = 0;
  nameArchive = 'Seleccione solo un archivo';
  @Output() saveFile = new EventEmitter<File>();
  @Input() progress: boolean;
  @Output() delete = new EventEmitter();


  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(
  ) {
   }

  ngOnInit(): void {
  }

  selectFiles(event:  any): void {
    this.selectedFiles = event.target.files;
    this.validateArchive(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.progress !== undefined && !this.progress) {
      if(this.myInputVariable != null || this.myInputVariable != undefined){
        this.myInputVariable.nativeElement.value = "";
      }
       this.nameArchive = "Seleccione solo un archivo";
    }

  }

  validateArchive(event): void {
    this.message = '';
      if (this.selectedFiles.length === 1) {
        this.file = this.selectedFiles[0];

        const ext  = this.file.name.split('.').pop();

        // Se valida la extencion
        if (this.validateExt(ext)) {
          if (this.validateSize(this.file.size)) {
            this.valid = 1;
            this.exist = true;
            this.nameArchive = this.file.name;
            this.saveFile.emit(event)
          } else {
            this.message = 'Tamaño no permitido';
            this.valid = 2;
          }
        } else {
          this.message = 'El archivo no tiene la extensión adecuada';
          this.valid = 2;
        }

      } else if(this.exist == false){
        this.message = 'Seleccione solo un archivo';
        this.valid = 2;
      }
  }

  validateExt(ext: any) {
    switch (ext) {
      case 'xlsx':
      case 'xls':
      case 'csv':
        return true;
      default:
        return false;
    }
  }

  validateSize(size: number) {
    if (size <= 5000000) {
      return true;
    }
    return false;
  }

  get validInput() {
    if(this.valid === 2){
       return true;
    }

    if (this.progress !== undefined && !this.progress) {
      if(this.myInputVariable != null || this.myInputVariable != undefined){
        this.myInputVariable.nativeElement.value = "";
      }
       this.nameArchive = "Seleccione solo un archivo";
    }
  }

  
  deleteFile() {
    this.exist = false;
    if(this.myInputVariable != null || this.myInputVariable != undefined){
        this.myInputVariable.nativeElement.value = "";
    }
    this.nameArchive = 'Seleccione solo un archivo';
    this.progress = false ;
    this.delete.emit();
  }


}
