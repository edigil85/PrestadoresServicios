import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { UtilService } from 'src/app/shared/service/util.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

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

  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [10, 15, 20, 25, 30];
  utilService: UtilService;
  form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      prefijoFactura: new FormControl('',[Validators.pattern('^[A-Za-z0-9]*$')]),
      numeroFactura: new FormControl('',[Validators.pattern('^[0-9]*$')]),
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
  }

  onSubmit() {
    var numerofactura: string, prefijoFactura: String, fechaRadicacionDesde: string, fechaRadicacionHasta: string
    
    numerofactura=this.form.get('numeroFactura').value;
    prefijoFactura=this.form.get('prefijoFactura').value;
    fechaRadicacionDesde=this.form.get('fechaInicial').value;
    fechaRadicacionHasta=this.form.get('fechaFinal').value;
  
    var respuesta = this.tipoconsulta(numerofactura, prefijoFactura, fechaRadicacionDesde, fechaRadicacionHasta )

    if(respuesta>4){
      this.openDialog(
        'Error Consulta',
        '',
        'No se cumplen con los criterios de busqueda');
    }
  }

  tipoconsulta(numerofactura: string, prefijoFactura: String, fechaRadicacionDesde: string, fechaRadicacionHasta: string ){
    if(!numerofactura && !prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 1
    }
    if(!numerofactura && prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 2
    }
    if(numerofactura && !prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 3
    }
    if(numerofactura && prefijoFactura && fechaRadicacionDesde && fechaRadicacionHasta){
      return 4
    }
    return 5
  }

  limpiar(){
    this.form.reset();
    
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

  get preFactura() { return this.form.get('prefijoFactura');}
  get numFactura() { return this.form.get('numeroFactura');}
  get fechaInicial() { return this.form.get('fechaInicial');}
  get fechaFinal() { return this.form.get('fechaFinal');}

}
