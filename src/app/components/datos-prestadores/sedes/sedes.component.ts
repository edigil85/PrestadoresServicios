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


@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {
  utilService: UtilService;
  Max_Registros: Number
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  ShowCards = true;
  ShowTable = false;
  ShowFilter= false;
  IconoMostrar="list";
  IconoFilter ="filter_alt";
  sede: Isedes;l
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25];
  sedes: Isedes[]=[];
  seleccionarTodos = false;
  UseFilter = false;
  textoFiltro= '';
  

  constructor(
    private dialog: MatDialog,
    private sedesservice: sedesservice,
  ) { 

  }

  ngOnInit(): void {
    this.Max_Registros= Constants.SEDES_PRESTADORES_MAX;
    this.ConsultarSedesPrestador();
  }

  ConsultarSedesPrestador(){
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.sede= {idRegistro: 0, nitPrestador: datos.numeroDocumentoPrestador, 
                tipoIdentificacion:datos.tipoDocumentoPrestador, 
                departamento: '', ciudad: '', direccion: '', sedeprincipal: 'S'};
    this.sedesservice.ConsultarSedes(this.sede)
    .subscribe(
       (result) => {
        this.sedes= result;
      },
      (error) => {
        this._getError(error);
      }

    )
  }

  onCreate() {
    localStorage.setItem("sedeprestador", JSON.stringify(this.sede));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(ModalsedesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.ConsultarSedesPrestador()
  ); 
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

  editSede(sede: Isedes){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    localStorage.setItem('sedeprestador', JSON.stringify(sede));
    this.dialog.open(ModalsedesComponent, dialogConfig);
  } 

  deleteSede(sede: Isedes){
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sedesservice.EliminarSedes(sede).subscribe(
          () => {
            this.ConsultarSedesPrestador();
         },
         (error) => {
          this._getError(error);
        }
       )
        this.ConsultarSedesPrestador();
        
      }
      this.dialogRef = null;
    });
  }

  deleteSedes(){
    
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
