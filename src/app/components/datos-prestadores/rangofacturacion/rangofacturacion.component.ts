import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator';
import { UtilService } from 'src/app/shared/service/util.service';
import { Constants } from 'src/app/shared/utils/Constants';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { DeleteconfirmmodalComponent } from '../modals/deleteconfirmmodal/deleteconfirmmodal.component';
import { ModalprefijofacturacionComponent } from '../modals/modalprefijofacturacion/modalprefijofacturacion.component'
import { IprefijoFacturacion } from '../model/prefijoFacturacion';
import { prefijoFacturacionService } from '../service/prefijoFacturacion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rangofacturacion',
  templateUrl: './rangofacturacion.component.html',
  styleUrls: ['./rangofacturacion.component.scss']
})
export class RangofacturacionComponent implements OnInit {
  max_Registros: Number;
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  showCards = true;
  showTable = false;
  showFilter= false;
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25];
  rangosFacturacion: IprefijoFacturacion[]=[];
  rangoFacturacion: IprefijoFacturacion;
  iconoMostrar="list";
  iconoFilter ="filter_alt";
  seleccionarTodos = false;
  useFilter = false;
  textoFiltro= '';
  utilService: UtilService;

  constructor(
    private dialog: MatDialog,
    private service: prefijoFacturacionService,
    private dateAdapter: DateAdapter<Date>,
    private spinner: NgxSpinnerService
  ) {
    this.dateAdapter.setLocale('es');
   }

  ngOnInit(): void {
    this.max_Registros= Constants.RANGOSFACTURACION_PRESTADORES_MAX;
    this.consultarPrefijoFacturacion(1);
  }

  editarPrefijo(prefijo: IprefijoFacturacion){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    localStorage.setItem('prefijoFacturacion', JSON.stringify(prefijo));
    const dialogRef = this.dialog.open(ModalprefijofacturacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarPrefijoFacturacion(2)
  ); 
  } 

  eliminarPrefijo(prefijo: IprefijoFacturacion){
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.eliminarPrefijoFacturacion(prefijo).subscribe(
          () => {
            this.consultarPrefijoFacturacion(1);
         },
         (error) => {
          this._getError(error); }
       )
        this.consultarPrefijoFacturacion(1);
        
      }
      this.dialogRef = null;
    });
  }

  
  eliminarPrefijosFacturacion(){
    this.rangoFacturacion= this.rangosFacturacion[0];
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar todos los prefijos de facturacion registrados?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.eliminarTodosPrefijosFacturacion(this.rangoFacturacion).subscribe(
          () => {
            this.seleccionarTodos= false;
            this.consultarPrefijoFacturacion(1);
         },
         (error) => {
          this._getError(error); }
       )
        this.consultarPrefijoFacturacion(1);
        
      }
      this.dialogRef = null;
    });
  }

  consultarPrefijoFacturacion(orden){
    this.spinner.show();
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.rangoFacturacion= {idRegistro:0,
      nitPrestador: datos.numeroDocumentoPrestador, 
      tipoIdentificacion:datos.tipoDocumentoPrestador, 
      prefijoFacturacion:'',
      activo:'S',
      fechaInicial:'',
      fechaFinal:'',
      rangoInicial:'',
      rangoFinal:'',
      fechaCreacion:null,
      fechaModificacion:null
    };

    this.service.consultarPrefijoFacturacion(this.rangoFacturacion)
    .subscribe(
      async (result) => {
        this.rangosFacturacion= await result;
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
        this._getError(error); }
    )
  }

  sortFechacreacion(){
    this.rangosFacturacion.sort(function (a, b) {
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
  this.rangosFacturacion.sort(function (a, b) {
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
    this.rangoFacturacion= {idRegistro:0,
      nitPrestador: datos.numeroDocumentoPrestador, 
      tipoIdentificacion:datos.tipoDocumentoPrestador, 
      prefijoFacturacion:'',
      activo:'S',
      fechaInicial:'',
      fechaFinal:'',
      rangoInicial:'',
      rangoFinal:'',
      fechaCreacion:null,
      fechaModificacion:null
    };
    localStorage.setItem("prefijoFacturacion", JSON.stringify(this.rangoFacturacion));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    const dialogRef = this.dialog.open(ModalprefijofacturacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarPrefijoFacturacion(1)
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