import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator';
import { DeleteconfirmmodalComponent } from '../modals/deleteconfirmmodal/deleteconfirmmodal.component';
import { ModalprefijofacturacionComponent } from '../modals/modalprefijofacturacion/modalprefijofacturacion.component'
import { IprefijoFacturacion } from '../model/prefijoFacturacion';
import { prefijoFacturacionService } from '../service/prefijoFacturacion.service';

@Component({
  selector: 'app-rangofacturacion',
  templateUrl: './rangofacturacion.component.html',
  styleUrls: ['./rangofacturacion.component.css']
})
export class RangofacturacionComponent implements OnInit {
  dialogRef: MatDialogRef<DeleteconfirmmodalComponent>;
  ShowCards = true;
  ShowTable = false;
  ShowFilter= false;
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25];
  rangosFacturacion: IprefijoFacturacion[]=[];
  rangoFacturacion: IprefijoFacturacion;
  IconoMostrar="list";
  IconoFilter ="filter_alt";
  seleccionarTodos = false;
  UseFilter = false;
  textoFiltro= '';

  constructor(
    private dialog: MatDialog,
    private service: prefijoFacturacionService,
  ) { }

  ngOnInit(): void {
    this.ConsultarPrefijoFacturacion();
  }

  editPrefijo(prefijo: IprefijoFacturacion){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    localStorage.setItem('prefijoFacturacion', JSON.stringify(prefijo));
    const dialogRef = this.dialog.open(ModalprefijofacturacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.ConsultarPrefijoFacturacion()
  ); 
  } 

  deletePrefijo(prefijo: IprefijoFacturacion){
    this.dialogRef = this.dialog.open(DeleteconfirmmodalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "¿Estás seguro de eliminar el registro seleccionado?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.EliminarPrefijoFacturacion(prefijo).subscribe(
          () => {
            this.ConsultarPrefijoFacturacion();
         }
       )
        this.ConsultarPrefijoFacturacion();
        
      }
      this.dialogRef = null;
    });
  }

  ConsultarPrefijoFacturacion(){
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.rangoFacturacion= {idRegistro:0,
      nitPrestador: datos.numeroDocumentoPrestador, 
      tipoIdentificacion:datos.tipoDocumentoPrestador, 
      prefijoFacturacion:'',
      activo:'S',
      fechaInicial:'',
      fechaFinal:''
    };
    this.service.ConsultarPrefijoFacturacion(this.rangoFacturacion)
    .subscribe(
       (result) => {
        this.rangosFacturacion= result;
      }
    )
  }

  onCreate() {
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.rangoFacturacion= {idRegistro:0,
      nitPrestador: datos.numeroDocumentoPrestador, 
      tipoIdentificacion:datos.tipoDocumentoPrestador, 
      prefijoFacturacion:'',
      activo:'S',
      fechaInicial:'',
      fechaFinal:''
    };
    localStorage.setItem("prefijoFacturacion", JSON.stringify(this.rangoFacturacion));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(ModalprefijofacturacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => 
      this.ConsultarPrefijoFacturacion()
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

  deletePrefijosFacturacion(){
    
  }
}
