import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator';
import { UtilService } from 'src/app/shared/service/util.service';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { DeleteconfirmmodalComponent } from '../modals/deleteconfirmmodal/deleteconfirmmodal.component';
import { ModalcontactoprestadorComponent } from '../modals/modalcontactoprestador/modalcontactoprestador.component'
import { IcontactoPrestador } from '../model/contactoPrestador';
import { contactoPrestadorService } from '../service/contactoPrestador.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-datoscontacto',
  templateUrl: './datoscontacto.component.html',
  styleUrls: ['./datoscontacto.component.scss']
})
export class DatoscontactoComponent implements OnInit {
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  showCards = true;
  showTable = false;
  showFilter= false;
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25];
  contactos: IcontactoPrestador[]=[];
  contacto: IcontactoPrestador;
  iconoMostrar="list";
  iconoFilter ="filter_alt";
  seleccionarTodos = false;
  useFilter = false;
  textoFiltro= '';
  utilService: UtilService;

  constructor(
    private dialog: MatDialog,
    private service: contactoPrestadorService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.consultarCodigosHabilitacion(1);
  }

  editarContacto(contacto: IcontactoPrestador){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    localStorage.setItem('contactoPrestador', JSON.stringify(contacto));
    const dialogRef = this.dialog.open(ModalcontactoprestadorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarCodigosHabilitacion(2)
  ); 
  } 

  eliminarContacto(contacto: IcontactoPrestador){
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.eliminarContactoPrestador(contacto).subscribe(
          () => {
            this.consultarCodigosHabilitacion(1);
         },
         (error) => {
          this._getError(error);
         })
        this.consultarCodigosHabilitacion(1);
        
      }
      this.dialogRef = null;
    });
  }

  
  eliminarContactos(){
    this.contacto = this. contactos[0];

    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar todos los contactos registrados?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.eliminarTodosContactosPrestador(this.contacto).subscribe(
          () => {
            this.seleccionarTodos= false;
            this.consultarCodigosHabilitacion(1);
         },
         (error) => {
          this._getError(error);
         })
        this.consultarCodigosHabilitacion(1);
        
      }
      this.dialogRef = null;
    });
  }

  consultarCodigosHabilitacion(orden){
    this.spinner.show();
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.contacto= {idRegistro:'1',
                nitPrestador: datos.numeroDocumentoPrestador, 
                tipoIdentificacion:datos.tipoDocumentoPrestador, 
                notificacionGlosa:'N',
	              notificacionDevoluciones:'N',
	              notificacionCartera:'N',
	              emailNotificacion:'',
	              nombre:'',
	              telefono:'',
                fechaCreacion:null,
                fechaModificacion:null};
    this.service.consultarContactoPrestador(this.contacto)
    .subscribe(
      async (result) => {
        this.contactos= await result;
        if(orden==1){
          this.sortFechacreacion();
        }
        else{
          this.sortFechaModificacion();
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this._getError(error);
      })
  }

  sortFechacreacion(){
    this.contactos.sort(function (a, b) {
      let dia1 = a.fechaModificacion;
      let dia2 = b.fechaModificacion;
    if ( dia1===null){
      dia1='01-JUL-2000 14:00:00'
    }
    if ( dia2===null){
      dia2='01-JUL-2000 14:00:00'
    }
    let date1= new Date(dia1.toString());
    let date2= new Date(dia2.toString());
      if (date1 > date2) {
        return -1;
      }
      if (date1 < date2) {
        return 1;
      }
      return 0});
}

sortFechaModificacion(){
  this.contactos.sort(function (a, b) {
    let dia1 = a.fechaModificacion;
    let dia2 = b.fechaModificacion;
  if ( dia1===null){
    dia1='01-JUL-2000 14:00:00'
  }
  if ( dia2===null){
    dia2='01-JUL-2000 14:00:00'
  }
  let date1= new Date(dia1.toString());
  let date2= new Date(dia2.toString());
  if (date1 > date2) {
    return -1;
  }
  if (date1 < date2) {
    return 1;
  }
  return 0});
}

  crear() {
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.contacto= {idRegistro:'0',
    nitPrestador: datos.numeroDocumentoPrestador, 
    tipoIdentificacion:datos.tipoDocumentoPrestador, 
    notificacionGlosa:'N',
    notificacionDevoluciones:'N',
    notificacionCartera:'N',
    emailNotificacion:'',
    nombre:'',
    telefono:'',
    fechaCreacion:null,
    fechaModificacion:null};
    localStorage.setItem("contactoPrestador", JSON.stringify(this.contacto));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    const dialogRef = this.dialog.open(ModalcontactoprestadorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarCodigosHabilitacion(1)
  ); 
  }

  handlePage(e: PageEvent){
    this.page_size= e.pageSize;
    this.page_number= e.pageIndex + 1;
  }

  usarFiltro(){
    if(this.showFilter == false){
      this.showFilter = true;
      this.useFilter = true;
      this.iconoFilter="close";
     }
     else{
      this.showFilter = false;
      this.useFilter = false;
      this.iconoFilter = "filter_alt";
     }
  }

  mostrar(){
    if(this.showTable == false){
     this.showCards=false;
     this.showTable=true;
     this.iconoMostrar="module";
    }
    else{
     this.showCards=true;
     this.showTable=false;
     this.iconoMostrar="list";
    }
  }


  openDialog(pTittle, pSubtittle, pMessage) {
    this.dialog.open(ModalDialogComponent, {
      data: {
        tittle: pTittle,
        subtittle: pSubtittle,
        message: pMessage,
      },
    });
  }


  _getError(error) {
    if (error.status === 500) {
      this.openDialog(
        'Mensaje Error',
        '',
        'Ocurrió un error en el servicio, por favor intente más tarde.'
      );
    } else if (error.status === 401) {
      this.openDialog(
        'Mensaje Error',
        '401',
        'Su sesión ha terminado, por favor inicia nuevamente.'
      );

    } else if (error.error.frontEndErrorCode != undefined) {
      this.openDialog(
        'Mensaje Error',
        '',
        this.utilService.showMessageError(error.error.frontEndErrorCode)
      );
    }
  }
}
