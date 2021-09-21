import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { UtilService } from 'src/app/shared/service/util.service';
import { IconsultaFacturaRadicada} from '../model/consultaFacturasRadicada';
import { IfacturaRadicada } from '../model/facturasRadicadas';
import { facturasRadicadasService} from '../service/facturaRadicada.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { saveAs } from 'file-saver';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-facturas-radicadas',
  templateUrl: './facturas-radicadas.component.html',
  styleUrls: ['./facturas-radicadas.component.scss']
})
export class FacturasRadicadasComponent implements OnInit {

  page_size: number = 10;
  page_number: number = 1;
  blob;
  pageSizeOption = [10, 15, 20, 25, 30];
  utilService: UtilService;
  consultaFacturaRadicada: IconsultaFacturaRadicada;
  facturasRadicadas: IfacturaRadicada[]=[];
  form: FormGroup;
  filename: string = null;

  constructor(
    private dialog: MatDialog,
    private service: facturasRadicadasService ,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder)
  { 
      this.form = this.formBuilder.group({
        numeroRadicacion: new FormControl('',[Validators.pattern('^[0-9]*$')]),
        fechaInicial: new FormControl('', [ this.fechaValidator(), this.fechadiferencia()]),
        fechaFinal: new FormControl('', [ this.fechaValidator(), this.fechadiferencia()]),
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
    this.limpiar();
  }

  onSubmit() {
    var numeroRadicacion: string, fechaRadicacionDesde: string, fechaRadicacionHasta: string
    
    numeroRadicacion=this.form.get('numeroRadicacion').value;
    fechaRadicacionDesde=this.form.get('fechaInicial').value;
    fechaRadicacionHasta=this.form.get('fechaFinal').value;
  
    var respuesta = this.tipoconsulta(numeroRadicacion, fechaRadicacionDesde, fechaRadicacionHasta )

    if(respuesta>3){
      this.openDialog(
        'Error Consulta',
        '',
        'No se cumplen con los criterios de busqueda');
    }
    else{
      this.consultarFacturaRadicada(numeroRadicacion, formatDate(fechaRadicacionDesde,"dd/MM/yyyy",'en-US') , formatDate(fechaRadicacionHasta,"dd/MM/yyyy",'en-US'), respuesta)
    }
  }

  tipoconsulta(numeroRadicacion: String, fechaRadicacionDesde: String, fechaRadicacionHasta: String ){
    if(numeroRadicacion && fechaRadicacionDesde && fechaRadicacionHasta){
      return 2
    }

    if (!numeroRadicacion && fechaRadicacionDesde && fechaRadicacionHasta){
      return 3
    }

    if (numeroRadicacion && !fechaRadicacionDesde && !fechaRadicacionHasta){
      return 1
    }
    return 4
  }
  

  limpiar(){
    this.form.reset();
    this.facturasRadicadas=[];
  }

  exportarPDF(factura: IfacturaRadicada){
    this.filename= factura.idPrestador+"-"+factura.numeroRadicacion;
    this.service.detallefacturaradicadaPDF(factura)
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

  ExportarCSV(factura: IfacturaRadicada){
    this.filename= factura.idPrestador+"-"+factura.numeroRadicacion;
    this.service.detallefacturaradicadaXLS(factura)
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





  consultarFacturaRadicada(numeroRadicacion: String, fechaRadicacionDesde: String, fechaRadicacionHasta: String, tipoConsulta: Number ){
    this.spinner.show();
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );

    switch(tipoConsulta){
      case 1: {
        this.consultaFacturaRadicada= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroRadicacion: numeroRadicacion, fechaRadicacionDesde:null, fechaRadicacionHasta: null, tipoconsulta:tipoConsulta };
        break;
      }
      case 2: {
        this.consultaFacturaRadicada= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroRadicacion: numeroRadicacion, fechaRadicacionDesde:fechaRadicacionDesde, fechaRadicacionHasta: fechaRadicacionHasta, tipoconsulta:tipoConsulta };
        break;
      }
      case 3: {
        this.consultaFacturaRadicada= {idPrestador: datos.numeroDocumentoPrestador, 
          tipoIdentificacion:datos.tipoDocumentoPrestador, 
          numeroRadicacion: null, fechaRadicacionDesde:fechaRadicacionDesde, fechaRadicacionHasta: fechaRadicacionHasta, tipoconsulta:tipoConsulta };
        break;
      }
    }

    this.service.consultarfacturaRadicada(this.consultaFacturaRadicada)
    .subscribe(
      async (result) => {
        this.facturasRadicadas= await result;
        this.spinner.hide();
      },(error) => {
        this.spinner.hide();
        this._getError(error);
      }
      )
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

  get radicacion() { return this.form.get('numeroRadicacion');}
  get fechaInicial() { return this.form.get('fechaInicial');}
  get fechaFinal() { return this.form.get('fechaFinal');}

}
