import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator';
import { UtilService } from 'src/app/shared/service/util.service';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { DeleteconfirmmodalComponent } from '../modals/deleteconfirmmodal/deleteconfirmmodal.component';
import { ModalcontactoprestadorComponent } from '../modals/modalcontactoprestador/modalcontactoprestador.component'
import { IcontactoPrestador } from '../model/contactoPrestador';
import { contactoPrestadorService } from '../service/contactoPrestador.service';

@Component({
  selector: 'app-datoscontacto',
  templateUrl: './datoscontacto.component.html',
  styleUrls: ['./datoscontacto.component.css']
})
export class DatoscontactoComponent implements OnInit {
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  ShowCards = true;
  ShowTable = false;
  ShowFilter= false;
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25];
  contactos: IcontactoPrestador[]=[];
  contacto: IcontactoPrestador;
  IconoMostrar="list";
  IconoFilter ="filter_alt";
  seleccionarTodos = false;
  UseFilter = false;
  textoFiltro= '';
  utilService: UtilService;

  constructor(
    private dialog: MatDialog,
    private service: contactoPrestadorService,
  ) { }

  ngOnInit(): void {
    this.ConsultarContactosPrestador();
  }

  editContacto(contacto: IcontactoPrestador){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    localStorage.setItem('contactoPrestador', JSON.stringify(contacto));
    const dialogRef = this.dialog.open(ModalcontactoprestadorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.ConsultarContactosPrestador()
  ); 
  } 

  deleteContacto(contacto: IcontactoPrestador){
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.EliminarContactoPrestador(contacto).subscribe(
          () => {
            this.ConsultarContactosPrestador();
         },
         (error) => {
          this._getError(error);
         })
        this.ConsultarContactosPrestador();
        
      }
      this.dialogRef = null;
    });
  }

  ConsultarContactosPrestador(){
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.contacto= {idRegistro:'1',
                nitPrestador: datos.numeroDocumentoPrestador, 
                tipoIdentificacion:datos.tipoDocumentoPrestador, 
                notificacionGlosa:'N',
	              notificacionDevoluciones:'N',
	              notificacionCartera:'N',
	              emailNotificacion:'',
	              nombre:'',
	              telefono:''};
    this.service.ConsultarContactoPrestador(this.contacto)
    .subscribe(
       (result) => {
        this.contactos= result;
      },
      (error) => {
        this._getError(error);
      })
  }

  onCreate() {
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.contacto= {idRegistro:'0',
    nitPrestador: datos.numeroDocumentoPrestador, 
    tipoIdentificacion:datos.tipoDocumentoPrestador, 
    notificacionGlosa:'',
    notificacionDevoluciones:'',
    notificacionCartera:'',
    emailNotificacion:'',
    nombre:'',
    telefono:''};
    localStorage.setItem("contactoPrestador", JSON.stringify(this.contacto));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    const dialogRef = this.dialog.open(ModalcontactoprestadorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.ConsultarContactosPrestador()
  ); 
  }

  handlePage(e: PageEvent){
    this.page_size= e.pageSize;
    this.page_number= e.pageIndex + 1;
  }

  UsarFiltro(){
    if(this.ShowFilter == false){
      this.ShowFilter = true;
      this.UseFilter = true;
      this.IconoFilter="close";
     }
     else{
      this.ShowFilter = false;
      this.UseFilter = false;
      this.IconoFilter = "filter_alt";
     }
  }

  mostrar(){
    if(this.ShowTable == false){
     this.ShowCards=false;
     this.ShowTable=true;
     this.IconoMostrar="module";
    }
    else{
     this.ShowCards=true;
     this.ShowTable=false;
     this.IconoMostrar="list";
    }
  }

  deleteContactos(){
    
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
