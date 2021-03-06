import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { UtilService } from 'src/app/shared/service/util.service';
import { IconsultaDevoluciones} from '../model/consultaDevoluciones';
import { Idevoluviones } from '../model/devoluciones';
import { devolucionesService} from '../service/devoluciones.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ErrorStateMatcher } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
import { MatAccordion } from '@angular/material/expansion';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.scss']
})
export class DevolucionesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  page_size: number = 10;
  page_number: number = 1;
  blob;
  pageSizeOption = [10, 15, 20, 25, 30];
  consultaDevoluciones: IconsultaDevoluciones;
  listaDevoluciones: Idevoluviones[]=[];
  mostrarDevoluciones: Idevoluviones[]=[]
  utilService: UtilService;
  form: FormGroup;
  filename: string = null;
  aldia="Al dia";
  proxima ="Proxima a vencerse";
  vencida ="Vencida";
  cantidadaldia: number=0;
  cantidadProxima: number=0;
  cantidadvencida: number=0;
  checked = false;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private service: devolucionesService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
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

  exportarTodosCSV(){
    this.spinner.show();
    this.filename=this.consultaDevoluciones.idPrestador+".csv";
    this.service.devolucionTodosCSV(this.consultaDevoluciones)
    .subscribe(
        (response: any) =>{
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (this.filename)
            downloadLink.setAttribute('download', this.filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    )
    this.spinner.hide();
  }

  exportarCSV(devolucion: Idevoluviones){
    this.filename= devolucion.idPrestador+"-"+devolucion.radicado+".csv";
    this.service.devolucionCSV(devolucion)
    .subscribe(
      (response: any) =>{
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (this.filename)
            downloadLink.setAttribute('download', this.filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    )
  }

  exportarPDF(devolucion: Idevoluviones){
    this.filename= devolucion.idPrestador+"-"+devolucion.radicado;
    this.service.devolucionPDF(devolucion)
    .subscribe(
      (response: any) =>{
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (this.filename)
            downloadLink.setAttribute('download', this.filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    )
  }


  expandir(){
  this.accordion.openAll();
  this.checked=true;
  }

  contraer(){
    this.accordion.closeAll();
    this.checked=false;
  }

  onSubmit() {
    var numerofactura: string, prefijoFactura: String, fechaDevolucionDesde: string, fechaDevolucionHasta: string
    
    numerofactura=this.form.get('numeroFactura').value;
    prefijoFactura=this.form.get('prefijoFactura').value;
    fechaDevolucionDesde=this.form.get('fechaInicial').value;
    fechaDevolucionHasta=this.form.get('fechaFinal').value;
  
    var respuesta = this.tipoconsulta(numerofactura, prefijoFactura, fechaDevolucionDesde, fechaDevolucionHasta )
    if(respuesta>4){
      this.openDialog(
        'Error Consulta',
        '',
        'No se cumplen con los criterios de busqueda');
    }
    else{
      this.consultarDevoluciones(
        numerofactura, 
        prefijoFactura, 
        formatDate(fechaDevolucionDesde,"dd/MM/yyyy",'en-US'), 
        formatDate(fechaDevolucionHasta,"dd/MM/yyyy",'en-US'),
        respuesta)
    }
  }

  consultarDevoluciones(numerofactura: String, prefijoFactura: String, fechaDevolucionDesde: String, fechaDevolucionHasta: String, tipoConsulta: Number ){
    this.spinner.show();
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );

    switch(tipoConsulta){
      case 1: {
        this.consultaDevoluciones= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroFactura: numerofactura, prefijoFactura:prefijoFactura ,fechaDevolucionDesde:fechaDevolucionDesde, 
          fechaDevolucionHasta: fechaDevolucionHasta, tipoconsulta:tipoConsulta };
        break;
      }
      case 2: {
        this.consultaDevoluciones= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroFactura: null, prefijoFactura:null ,fechaDevolucionDesde:fechaDevolucionDesde, 
          fechaDevolucionHasta: fechaDevolucionHasta, tipoconsulta:tipoConsulta };
        break;
      }
      case 3: {
        this.consultaDevoluciones= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroFactura: numerofactura, prefijoFactura:null ,fechaDevolucionDesde:fechaDevolucionDesde, 
          fechaDevolucionHasta: fechaDevolucionHasta, tipoconsulta:tipoConsulta };
        break;
      }
      case 4: {
        this.consultaDevoluciones= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroFactura: null, prefijoFactura:prefijoFactura ,fechaDevolucionDesde:fechaDevolucionDesde, 
          fechaDevolucionHasta: fechaDevolucionHasta, tipoconsulta:tipoConsulta };
        break;
      }
    }

    this.service.consultarDevoluciones(this.consultaDevoluciones)
    .subscribe(
      async (result) => {
        this.listaDevoluciones= await result;
        this.cantidadaldia=0;
        this.cantidadProxima=0;
        this.cantidadvencida=0;
        for(var i=0;i<this.listaDevoluciones.length; i++){
          if(this.listaDevoluciones[i].estado==this.aldia){
            this.cantidadaldia= this.cantidadaldia + 1;
          }
          if(this.listaDevoluciones[i].estado==this.proxima){
            this.cantidadProxima= this.cantidadProxima + 1;
          }
          if(this.listaDevoluciones[i].estado==this.vencida){
            this.cantidadvencida= this.cantidadvencida + 1;
          }
           this.mostrarDevoluciones=this.listaDevoluciones;
        }
        this.spinner.hide();
      },(error) => {
        this.spinner.hide();
        this._getError(error);
      }
      )
  }

  tipoconsulta(numerofactura: string, prefijoFactura: String, fechaRadicacionDesde: string, fechaRadicacionHasta: string ){
    if(numerofactura && prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 1
    }
    if(!numerofactura && !prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 2
    }
    if(numerofactura && !prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 3
    }
    if(!numerofactura && prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 4
    }
    return 5
  }

  limpiar(){
    this.form.reset();
    this.listaDevoluciones=[];
    this.mostrarDevoluciones=[];
    this.cantidadaldia=0;
    this.cantidadProxima=0;
    this.cantidadvencida=0;
  }

  filtroTodos(){
    this.mostrarDevoluciones=this.listaDevoluciones;
    if(this.checked){
      this.accordion.openAll();
    }
    else{
      this.accordion.closeAll();
    }
  }

  filtroAldia(){
    this.mostrarDevoluciones=this.listaDevoluciones.filter(devolucion => devolucion.estado==this.aldia);
    this.contraer();
  }

  filtroProximo(){
    this.mostrarDevoluciones=this.listaDevoluciones.filter(devolucion => devolucion.estado==this.proxima);
    this.contraer();
  }

  filtroVencido(){
    this.mostrarDevoluciones=this.listaDevoluciones.filter(devolucion => devolucion.estado==this.vencida);
    this.contraer();
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

  get preFactura() { return this.form.get('prefijoFactura');}
  get numFactura() { return this.form.get('numeroFactura');}
  get fechaInicial() { return this.form.get('fechaInicial');}
  get fechaFinal() { return this.form.get('fechaFinal');}

}
