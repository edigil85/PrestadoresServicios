import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'
import {ModalcodigohabilitacionComponent} from '../modals/modalcodigohabilitacion/modalcodigohabilitacion.component';
import { DeleteconfirmmodalComponent } from '../modals/deleteconfirmmodal/deleteconfirmmodal.component';
import { codigoHabilitacionService} from '../service/codigosHabilitacion.service';
import { PageEvent } from '@angular/material/paginator';
import { IcodigoHabilitacion } from '../model/codigoHabilitacion';



@Component({
  selector: 'app-codigohabilitacion',
  templateUrl: './codigohabilitacion.component.html',
  styleUrls: ['./codigohabilitacion.component.css']
})
export class CodigohabilitacionComponent implements OnInit {
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  ShowCards = true;
  ShowTable = false;
  ShowFilter= false;
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25];
  codigos: IcodigoHabilitacion[]=[];
  codigo: IcodigoHabilitacion;
  IconoMostrar="list";
  IconoFilter ="filter_alt";
  seleccionarTodos = false;
  UseFilter = false;
  textoFiltro= '';


  constructor(
    private dialog: MatDialog,
    private service: codigoHabilitacionService,
  ) { }

  ngOnInit(): void {
    this.ConsultarCodigosHabilitacion();
  }

  editCodigo(codigo: IcodigoHabilitacion){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    localStorage.setItem('codigoHabilitacion', JSON.stringify(codigo));
    const dialogRef = this.dialog.open(ModalcodigohabilitacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.ConsultarCodigosHabilitacion()
  ); 
  } 

  deleteCodigo(codigo: IcodigoHabilitacion){
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.EliminarCodigoHabilitacion(codigo).subscribe(
          () => {
            this.ConsultarCodigosHabilitacion();
         }
       )
        this.ConsultarCodigosHabilitacion();
        
      }
      this.dialogRef = null;
    });
  }

  ConsultarCodigosHabilitacion(){
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.codigo= {nitPrestador: datos.numeroDocumentoPrestador, 
                tipoIdentificacion:datos.tipoDocumentoPrestador, 
                codigoHabilitacion:'', descripcionServicio:''};
    this.service.ConsultarCodigoHabilitacion(this.codigo)
    .subscribe(
       (result) => {
        this.codigos= result;
      }
    )
  }

  onCreate() {
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.codigo= {nitPrestador: datos.numeroDocumentoPrestador, 
      tipoIdentificacion:datos.tipoDocumentoPrestador, 
      codigoHabilitacion:'', descripcionServicio:''};
    localStorage.setItem("codigoHabilitacion", JSON.stringify(this.codigo));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(ModalcodigohabilitacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.ConsultarCodigosHabilitacion()
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

  deleteCodigos(){
    
  }


}
