import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'
import { ModalcodigohabilitacionComponent } from '../modals/modalcodigohabilitacion/modalcodigohabilitacion.component';
import { DeleteconfirmmodalComponent } from '../modals/deleteconfirmmodal/deleteconfirmmodal.component';
import { codigoHabilitacionService} from '../service/codigosHabilitacion.service';
import { PageEvent } from '@angular/material/paginator';
import { IcodigoHabilitacion } from '../model/codigoHabilitacion';
import { Constants } from 'src/app/shared/utils/Constants';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { UtilService } from 'src/app/shared/service/util.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-codigohabilitacion',
  templateUrl: './codigohabilitacion.component.html',
  styleUrls: ['./codigohabilitacion.component.scss']
})
export class CodigohabilitacionComponent implements OnInit {
  Max_Registros: Number;
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  showCards = true;
  showTable = false;
  showFilter= false;
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25];
  codigos: IcodigoHabilitacion[]=[];
  codigo: IcodigoHabilitacion;
  iconoMostrar="list";
  iconoFilter ="filter_alt";
  seleccionarTodos = false;
  useFilter = false;
  textoFiltro= '';
  utilService: UtilService;


  constructor(
    private dialog: MatDialog,
    private service: codigoHabilitacionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.Max_Registros= Constants.CODIGOSHABILITACION_PRESTADORES_MAX;
    this.consultarCodigosHabilitacion(1);
  }

  editarCodigo(codigo: IcodigoHabilitacion){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    localStorage.setItem('codigoHabilitacion', JSON.stringify(codigo));
    const dialogRef = this.dialog.open(ModalcodigohabilitacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarCodigosHabilitacion(2)
  ); 
  } 

  eliminarCodigo(codigo: IcodigoHabilitacion){
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "??Est??s seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.eliminarCodigoHabilitacion(codigo).subscribe(
          () => {
            this.consultarCodigosHabilitacion(1);
         },
         (error) => {
          this._getError(error);
         })
      }
      this.dialogRef = null;
    });
  }

  eliminarCodigos(
  ){
    this.codigo=this.codigos[0];

    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "??Est??s seguro de eliminar todos los c??digos de habilitacion de servicios?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.eliminarTodosCodigosHabilitacion(this.codigo).subscribe(
          () => {
            this.consultarCodigosHabilitacion(1);
            this.seleccionarTodos= false;
         },
         (error) => {
          this._getError(error);
         })
      }
      this.dialogRef = null;
    });
  }

  consultarCodigosHabilitacion(orden){
    this.spinner.show();
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.codigo= {nitPrestador: datos.numeroDocumentoPrestador, 
                tipoIdentificacion:datos.tipoDocumentoPrestador, 
                codigoHabilitacion:'', descripcionServicio:'', fechaCreacion:null, fechaModificacion:null};
    this.service.consultarCodigoHabilitacion(this.codigo)
    .subscribe(
      async (result) => {
        this.codigos= await result;
        if(orden===1){
          this.sortFechacreacion();
        }
        else{
          this.sortFechaModificacion();
          console.log(this.codigos)
        }
        this.spinner.hide();
      },(error) => {
        this.spinner.hide();
        this._getError(error);
      }
      )
  }

  
  sortFechacreacion(){
    this.codigos.sort(function (a, b) {
      let dia1 = a.fechaCreacion;
      let dia2 = b.fechaCreacion;
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
  this.codigos.sort(function (a, b) {
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
    this.codigo= {nitPrestador: datos.numeroDocumentoPrestador, 
      tipoIdentificacion:datos.tipoDocumentoPrestador, 
      codigoHabilitacion:'', descripcionServicio:'', fechaCreacion:null, fechaModificacion:null};
    localStorage.setItem("codigoHabilitacion", JSON.stringify(this.codigo));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(ModalcodigohabilitacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarCodigosHabilitacion(1)
  ); 
  }

  handlePage(e: PageEvent){
    this.page_size= e.pageSize;
    this.page_number= e.pageIndex + 1;
  }

  UsarFiltro(){
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
        'Ocurri?? un error en el servicio, por favor intente m??s tarde.'
      );
    } else if (error.status === 401) {
      this.openDialog(
        'Mensaje Error',
        '401',
        'Su sesi??n ha terminado, por favor inicia nuevamente.'
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
