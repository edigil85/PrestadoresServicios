import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'
import { ModalsedesComponent} from '../modals/modalsedes/modalsedes.component'
import { Isedes} from '../model/sedes';
import { sedesservice} from '../service/sedes.service'
import { DeleteconfirmmodalComponent } from '../modals/deleteconfirmmodal/deleteconfirmmodal.component'
import { PageEvent } from '@angular/material/paginator';
import { Constants } from 'src/app/shared/utils/Constants';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { UtilService } from 'src/app/shared/service/util.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IdatosPrestador } from '../../datos-prestadores/model/datosprestador'
import { utilPrestadoresService } from '../service/utilPrestadoresService';


@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss']
})
export class SedesComponent implements OnInit {
  utilService: UtilService;
  max_Registros: Number
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  showCards = true;
  showTable = false;
  showFilter= false;
  iconoMostrar="list";
  iconoFilter ="filter_alt";
  sede: Isedes;l
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25, 30];
  sedes: Isedes[]=[];
  seleccionarTodos = false;
  useFilter = false;
  textoFiltro= '';
  datosPrestador: IdatosPrestador;
  util: UtilService;
  

  constructor(
    private dialog: MatDialog,
    private sedesservice: sedesservice,
    private utilServices: utilPrestadoresService,
    private spinner: NgxSpinnerService
  ) { 

  }

  ngOnInit(): void {
    this.max_Registros= Constants.SEDES_PRESTADORES_MAX;
    this.consultarDatosSeccion();
  }

  ngAfterViewInit(): void {
  }

  consultarDatosSeccion(){
    this.utilServices.getDatosPrestador()
    .subscribe(
       async  result => {
        this.datosPrestador= await result;
        localStorage.setItem("SSE", JSON.stringify(this.datosPrestador));
        this.consultarSedesPrestador(1);
      },(error) => {
        this._getError(error); }
    ); 
  }

  consultarSedesPrestador(orden){
    this.spinner.show();
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.sede= {idRegistro: 0, nitPrestador: datos.numeroDocumentoPrestador, 
      tipoIdentificacion:datos.tipoDocumentoPrestador, 
      departamento: '', ciudad: '', direccion: '', sedeprincipal: 'S', fechaCreacion:null, fechaModificacion:null,
      codigoCiudad: '' };
    this.sedesservice.consultarSedes(this.sede)
    .subscribe(
      async (result) => {
        this.sedes= await result;
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
      }

    )
  }

  sortFechacreacion(){
    this.sedes.sort(function (a, b) {
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
  this.sedes.sort(function (a, b) {
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
    localStorage.setItem("sedeprestador", JSON.stringify(this.sede));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(ModalsedesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarSedesPrestador(1)
  ); 
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

  editarSede(sede: Isedes){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    localStorage.setItem('sedeprestador', JSON.stringify(sede));
    const dialogRef = this.dialog.open(ModalsedesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.consultarSedesPrestador(2)
  ); 
  } 

  eliminarSede(sede: Isedes){
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sedesservice.eliminarSedes(sede).subscribe(
          () => {
            this.consultarSedesPrestador(1);
         },
         (error) => {
          this._getError(error);
        }
       )
        this.consultarSedesPrestador(1);
        
      }
      this.dialogRef = null;
    });
  }

  eliminarSedes(){
    this.sede = this.sedes[0];
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar todas las sedes registradas?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sedesservice.eliminarTodasSedes(this.sede).subscribe(
          () => {
            this.seleccionarTodos= false;
            this.consultarSedesPrestador(1);
         },
         (error) => {
          this._getError(error);
        }
       )
        this.consultarSedesPrestador(1);
        
      }
      this.dialogRef = null;
    });
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
