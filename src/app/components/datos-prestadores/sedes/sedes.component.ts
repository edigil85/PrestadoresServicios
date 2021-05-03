import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'
import { ModalsedesComponent} from '../modals/modalsedes/modalsedes.component'
import { Isedes} from '../model/sedes';
import { sedesservice} from '../service/sedes.service'
import { DeleteconfirmmodalComponent } from '../modals/deleteconfirmmodal/deleteconfirmmodal.component'
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  ShowCards = true;
  ShowTable = false;
  ShowFilter= false;
  IconoMostrar="list";
  IconoFilter ="filter_alt";
  sede: Isedes;
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
        console.log('consulta de sedes');
      }
    )
  }

  onCreate() {
    console.log(this.sede);
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
    console.log(sede);
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sedesservice.EliminarSedes(sede).subscribe(
          () => {
            this.ConsultarSedesPrestador();
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
}
