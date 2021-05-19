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
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es');
   }

  ngOnInit(): void {
    this.max_Registros= Constants.RANGOSFACTURACION_PRESTADORES_MAX;
    this.consultarPrefijoFacturacion();
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
      this.consultarPrefijoFacturacion()
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
            this.consultarPrefijoFacturacion();
         },
         (error) => {
          this._getError(error); }
       )
        this.consultarPrefijoFacturacion();
        
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
            this.consultarPrefijoFacturacion();
         },
         (error) => {
          this._getError(error); }
       )
        this.consultarPrefijoFacturacion();
        
      }
      this.dialogRef = null;
    });
  }

  consultarPrefijoFacturacion(){
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.rangoFacturacion= {idRegistro:0,
      nitPrestador: datos.numeroDocumentoPrestador, 
      tipoIdentificacion:datos.tipoDocumentoPrestador, 
      prefijoFacturacion:'',
      activo:'S',
      fechaInicial:'',
      fechaFinal:'',
      rangoInicial:'',
      rangoFinal:''
    };

    this.service.consultarPrefijoFacturacion(this.rangoFacturacion)
    .subscribe(
       (result) => {
        this.rangosFacturacion= result;
      },  
      (error) => {
        this._getError(error); }
    )
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
      rangoFinal:''
    };
    localStorage.setItem("prefijoFacturacion", JSON.stringify(this.rangoFacturacion));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    const dialogRef = this.dialog.open(ModalprefijofacturacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarPrefijoFacturacion()
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