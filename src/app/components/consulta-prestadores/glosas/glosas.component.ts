import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IconsultaGlosa} from '../model/consultaGlosas';
import { Iglosas } from '../model/glosas';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { UtilService } from 'src/app/shared/service/util.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
import { MatAccordion } from '@angular/material/expansion';
import { glosasService } from '../service/glosas.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-glosas',
  templateUrl: './glosas.component.html',
  styleUrls: ['./glosas.component.scss']
})
export class GlosasComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  blob;
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25, 30];
  consultaGlosas: IconsultaGlosa;
  listaGlosas: Iglosas[]=[];
  mostrarglosas: Iglosas[]=[]
  utilService: UtilService;
  aldia="Al dia";
  proxima ="Proxima a vencerse";
  vencida ="Vencida";
  cantidadaldia: number=0;
  cantidadProxima: number=0;
  cantidadvencida: number=0;
  form: FormGroup;
  checked = false;

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private service: glosasService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      numeroglosa: new FormControl('',[Validators.pattern('^[0-9]*$')]),
      prefijoFactura: new FormControl('',[Validators.pattern('^[A-Za-z0-9]*$')]),
      numeroFactura: new FormControl('',[Validators.pattern('^[0-9]*$')]),
      fechaInicial: new FormControl('', [Validators.required, this.fechaValidator(), this.fechadiferencia()]),
      fechaFinal: new FormControl('', [Validators.required, this.fechaValidator(), this.fechadiferencia()]),
    });
   }

   fechaValidator()
  {
    return (control:FormControl)=>
    {
      const form=control.parent
      if (form)
      {
        const min=form.get('fechaInicial');
        const max=form.get('fechaFinal');
        return min.value && max.value && +max.value<+min.value?{inva:true}:null
      }
    }
  }

  fechadiferencia()
  {
    return (control:FormControl)=>
    {
      const form=control.parent
      if (form)
      {
        const min=form.get('fechaInicial');
        const max=form.get('fechaFinal');
        var resta=(Number(max.value)-Number(min.value))/(1000*60*60*24);
        return min.value && max.value && +resta>92?{dif:true}:null
      }
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("le estoy dando en consultar");
    var numeroglosa: String, numerofactura: string, prefijoFactura: String, fechaRadicacionDesde: string, fechaRadicacionHasta: string
    
    numeroglosa= this.form.get('numeroglosa').value;
    numerofactura=this.form.get('numeroFactura').value;
    prefijoFactura=this.form.get('prefijoFactura').value;
    fechaRadicacionDesde=this.form.get('fechaInicial').value;
    fechaRadicacionHasta=this.form.get('fechaFinal').value;
  
    var respuesta = this.tipoconsulta(numeroglosa, numerofactura, prefijoFactura, fechaRadicacionDesde, fechaRadicacionHasta )

    if(respuesta>6){
      this.openDialog(
        'Error Consulta',
        '',
        'No se cumplen con los criterios de busqueda');
    }
    else{
      this.consultarGlosas(numeroglosa,
        numerofactura, 
        prefijoFactura, 
        formatDate(fechaRadicacionDesde,"dd/MM/yyyy",'en-US'), 
        formatDate(fechaRadicacionHasta,"dd/MM/yyyy",'en-US'),
        respuesta)
    }
  }

  exportarCSV(glosa: Iglosas){
    // this.filename= devolucion.idPrestador+"-"+devolucion.radicado+".csv";
    // this.service.devolucionCSV(devolucion)
    // .subscribe(
    //   (response: any) =>{
    //     let dataType = response.type;
    //     let binaryData = [];
    //     binaryData.push(response);
    //     let downloadLink = document.createElement('a');
    //     downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    //     if (this.filename)
    //         downloadLink.seIglosastAttribute('download', this.filename);
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    // }
    // )
  }

  exportarPDF(glosa: Iglosas){
    // this.filename= devolucion.idPrestador+"-"+devolucion.radicado;
    // this.service.devolucionPDF(devolucion)
    // .subscribe(
    //   (response: any) =>{
    //     let dataType = response.type;
    //     let binaryData = [];
    //     binaryData.push(response);
    //     let downloadLink = document.createElement('a');
    //     downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    //     if (this.filename)
    //         downloadLink.setAttribute('download', this.filename);
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    // }
    // )
  }

  exportarTodosCSV(){
    // this.spinner.show();
    // this.filename=this.consultaDevoluciones.idPrestador+".csv";
    // this.service.devolucionTodosCSV(this.consultaDevoluciones)
    // .subscribe(
    //     (response: any) =>{
    //     let dataType = response.type;
    //     let binaryData = [];
    //     binaryData.push(response);
    //     let downloadLink = document.createElement('a');
    //     downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    //     if (this.filename)
    //         downloadLink.setAttribute('download', this.filename);
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    // }
    // )
    // this.spinner.hide();
  }

  consultarGlosas(numeroglosa: String, numerofactura: String, prefijoFactura: String, fechaRadicacionDesde: String, fechaRadicacionHasta: String,
    tipoConsulta: number ){
    this.spinner.show();
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );

    switch(tipoConsulta){
      case 1: {
        this.consultaGlosas= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroGlosa: '', prefijoFactura:null ,numeroFactura:null, 
          fechaNotificacionDesde: fechaRadicacionDesde, fechaNotificacionHasta:fechaRadicacionHasta,
          tipoconsulta:tipoConsulta };
        break;
      }
      case 2: {
        this.consultaGlosas= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroGlosa: numeroglosa, prefijoFactura:null ,numeroFactura:null, 
          fechaNotificacionDesde: fechaRadicacionDesde, fechaNotificacionHasta:fechaRadicacionHasta,
          tipoconsulta:tipoConsulta };
        break;
      }
      case 3: {
        this.consultaGlosas= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroGlosa: '', prefijoFactura:prefijoFactura ,numeroFactura:null, 
          fechaNotificacionDesde: fechaRadicacionDesde, fechaNotificacionHasta:fechaRadicacionHasta,
          tipoconsulta:tipoConsulta };
        break;
      }
      case 4: {
        this.consultaGlosas= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroGlosa: '', prefijoFactura:null ,numeroFactura:numerofactura, 
          fechaNotificacionDesde: fechaRadicacionDesde, fechaNotificacionHasta:fechaRadicacionHasta,
          tipoconsulta:tipoConsulta };
        break;
      }
      case 5: {
        this.consultaGlosas= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroGlosa: '', prefijoFactura:prefijoFactura ,numeroFactura:numerofactura, 
          fechaNotificacionDesde: fechaRadicacionDesde, fechaNotificacionHasta:fechaRadicacionHasta,
          tipoconsulta:tipoConsulta };
        break;
      }
      case 6: {
        this.consultaGlosas= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroGlosa: numeroglosa, prefijoFactura:prefijoFactura ,numeroFactura:numerofactura, 
          fechaNotificacionDesde: fechaRadicacionDesde, fechaNotificacionHasta:fechaRadicacionHasta,
          tipoconsulta:tipoConsulta };
        break;
      }
      default:{
        this.consultaGlosas= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroGlosa: null, prefijoFactura:null ,numeroFactura:null, 
          fechaNotificacionDesde: null, fechaNotificacionHasta:null,
          tipoconsulta:tipoConsulta };
        break;
      }
    }

    this.service.consultarGlosas(this.consultaGlosas)
    .subscribe(
      async (result) => {
        this.listaGlosas= await result;
        for(var i=0;i<this.listaGlosas.length; i++){
          if(this.listaGlosas[i].estado==this.aldia){
            this.cantidadaldia= this.cantidadaldia + 1;
          }
          if(this.listaGlosas[i].estado==this.proxima){
            this.cantidadProxima= this.cantidadProxima + 1;
          }
          if(this.listaGlosas[i].estado==this.vencida){
            this.cantidadvencida= this.cantidadvencida + 1;
          }
            this.mostrarglosas=this.listaGlosas;
        }
        this.spinner.hide();
      },(error) => {
        this.spinner.hide();
        this._getError(error);
      }
      )
  }

  filtroTodos(){
    this.mostrarglosas=this.listaGlosas;
    if(this.checked){
      this.accordion.openAll();
    }
    else{
      this.accordion.closeAll();
    }
  }

  filtroAldia(){
    this.mostrarglosas=this.listaGlosas.filter(glosas => glosas.estado==this.aldia);
    this.contraer();
  }

  filtroProximo(){
    this.mostrarglosas=this.listaGlosas.filter(glosas => glosas.estado==this.proxima);
    this.contraer();
  }

  filtroVencido(){
     this.mostrarglosas=this.listaGlosas.filter(glosas => glosas.estado==this.vencida);
     this.contraer();
  }


  tipoconsulta(numeroglosa: String, numerofactura: string, prefijoFactura: String, fechaRadicacionDesde: string, fechaRadicacionHasta: string ){
    if(!numeroglosa && !numerofactura && !prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 1
    }
    if(numeroglosa && !numerofactura && !prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 2
    }
    if(!numeroglosa && !numerofactura && prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 3
    }
    if(!numeroglosa && numerofactura && !prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 4
    }
    if(!numeroglosa && numerofactura && prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 5
    }
    if(numeroglosa && numerofactura && prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 6
    }
    return 7
  }


  limpiar(){
    this.form.reset();
    this.listaGlosas=[];
    this.mostrarglosas=[];
    this.cantidadaldia=0;
    this.cantidadProxima=0;
    this.cantidadvencida=0;
  }

  expandir(){
    this.accordion.openAll();
    this.checked=true;
    }
  
  contraer(){
    this.accordion.closeAll();
    this.checked=false;
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

  handlePage(e: PageEvent){
    this.page_size= e.pageSize;
    this.page_number= e.pageIndex + 1;
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

  get numGlosa() { return this.form.get('numeroglosa');}
  get preFactura() { return this.form.get('prefijoFactura');}
  get numFactura() { return this.form.get('numeroFactura');}
  get fechaInicial() { return this.form.get('fechaInicial');}
  get fechaFinal() { return this.form.get('fechaFinal');}

}
