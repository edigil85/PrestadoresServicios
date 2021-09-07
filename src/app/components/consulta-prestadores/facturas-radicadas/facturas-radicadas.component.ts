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
  pageSizeOption = [10, 15, 20, 25, 30];
  utilService: UtilService;
  consultaFacturaRadicada: IconsultaFacturaRadicada;
  facturaRadicada: IfacturaRadicada[]=[];
  form: FormGroup;

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
        console.log(resta);
        return min.value && max.value && +resta>92?{dif:true}:null
      }
    }
  }
  

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("se presiono el boton consultar");
  }


  limpiar(){
    this.form.reset();
  }



  consultarFacturaRadicada(any){
    this.spinner.show();
    var datos = JSON.parse( localStorage.getItem( "SSE" ) );
    this.consultaFacturaRadicada= {idPrestador: datos.numeroDocumentoPrestador, 
                tipoIdentificacion:datos.tipoDocumentoPrestador, 
                numeroRadicacion: null, fechaRadicacionDesde:null, fechaRadicacionHasta: null, tipoConsulta:null };
    this.service.consultarfacturaRadicada(this.consultaFacturaRadicada)
    .subscribe(
      async (result) => {
        this.facturaRadicada= await result;
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
