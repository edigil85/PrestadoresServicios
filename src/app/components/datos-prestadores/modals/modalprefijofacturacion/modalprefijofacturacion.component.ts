import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/components/modal-dialog/modal-dialog.component';
import { IprefijoFacturacion } from '../../model/prefijoFacturacion';
import { prefijoFacturacionService } from '../../service/prefijoFacturacion.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-modalprefijofacturacion',
  templateUrl: './modalprefijofacturacion.component.html',
  styleUrls: ['./modalprefijofacturacion.component.scss']
})
export class ModalprefijofacturacionComponent implements OnInit {

  form: FormGroup;
  prefijoFacturacion: IprefijoFacturacion;
  busquedaprefijo: IprefijoFacturacion
  rangoFacturacion: IprefijoFacturacion [];
  modificarCodigo: boolean= false;
  fechaminima: Date;
  fechaPaso: Date;
  accionValida:boolean =true;


  constructor(
    private dialog: MatDialog,
    public service: prefijoFacturacionService,
    public dialogRef: MatDialogRef<ModalprefijofacturacionComponent>,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      prefijoFacturacion: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      rangoInicial: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$'), this.rangoValidator()]),
      rangoFinal: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$'), this.rangoValidator()]),
      fechaInicial: new FormControl('', [Validators.required, this.fechaValidator()]),
      fechaFinal: new FormControl('', [Validators.required, this.fechaValidator()]),
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

  rangoValidator()
  {
    return (control:FormControl)=>
    {
      const form=control.parent
      if (form)
      {
        const min=form.get('rangoInicial');
        const max=form.get('rangoFinal');
        return min.value && max.value && +max.value<=min.value?{maxmin :true}:null
      }
    }
  }

  ngOnInit(): void {
    this.prefijoFacturacion= JSON.parse(localStorage.getItem('prefijoFacturacion'));
    localStorage.removeItem('prefijoFacturacion');
    if(this.prefijoFacturacion.idRegistro==0){
      this.modificarCodigo= true;
    }
    else{
      this.modificarCodigo= false;
    }
    this.datosFormGroup(this.prefijoFacturacion.prefijoFacturacion, 
      this.prefijoFacturacion.rangoInicial,
      this.prefijoFacturacion.rangoFinal,
      this.remplazarMes_Es_En(this.prefijoFacturacion.fechaInicial.toString()),
      this.remplazarMes_Es_En(this.prefijoFacturacion.fechaFinal.toString())
      );
      this.fechaminima= new Date((this.form.get("fechaInicial").value));
      this.fechaminima.setDate(this.fechaminima.getDate()+1);
  }

  onSubmit() {
    if(this.accionValida){
    if (this.form.get('fechaFinal').value == this.remplazarMes_Es_En(this.prefijoFacturacion.fechaFinal)
      && this.form.get('rangoFinal').value == this.remplazarMes_Es_En(this.prefijoFacturacion.rangoFinal)
      )
     {
      this.dialogRef.close();
    }
     else{
      if(this.prefijoFacturacion.prefijoFacturacion == ''){
        this.prefijoFacturacion.prefijoFacturacion = this.form.get('prefijoFacturacion'). value;
        this.fechaPaso = this.form.get('fechaInicial'). value;
        this.prefijoFacturacion.fechaInicial= this.remplazarMes_En_Es(this.fechaPaso.toLocaleDateString('en-US', 
        {  month: 'short', year: 'numeric', day: 'numeric' }));
        this.fechaPaso = this.form.get('fechaFinal'). value;
        this.prefijoFacturacion.fechaFinal= this.remplazarMes_En_Es(this.fechaPaso.toLocaleDateString('en-US', 
        {  month: 'short', year: 'numeric', day: 'numeric' }));
        this.prefijoFacturacion.rangoInicial= this.form.get('rangoInicial').value
        this.prefijoFacturacion.rangoFinal= this.form.get('rangoFinal').value
        this.prefijoFacturacion.fechaCreacion=null;
        this.prefijoFacturacion.fechaModificacion=null;
        this.service.insertarPrefijoFacturacion(this.prefijoFacturacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
      else{
        this.fechaPaso = this.form.get('fechaFinal'). value;
        this.prefijoFacturacion.fechaFinal= this.remplazarMes_En_Es(this.fechaPaso.toLocaleDateString('en-US', 
        {  month: 'short', year: 'numeric', day: 'numeric' }));
        this.prefijoFacturacion.rangoFinal= this.form.get('rangoFinal').value
        this.prefijoFacturacion.fechaCreacion=null;
        this.prefijoFacturacion.fechaModificacion=null;
        this.service.actualizarPrefijoFacturacion(this.prefijoFacturacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
     }
    }
  }

  datosFormGroup(prefijoFacturacion: String, rangoInicial: String, rangoFinal:String, fechaInicial: String, fechaFinal: String){
    this.form.patchValue({
      prefijoFacturacion: prefijoFacturacion,
      rangoInicial: rangoInicial,
      rangoFinal: rangoFinal,
      fechaInicial: new Date(fechaInicial.toString()),
      fechaFinal: new Date(fechaFinal.toString())
    });
  }


  onClose() {
    this.accionValida=false;
    this.dialogRef.close();
  }

  cambioDia(){
    this.fechaminima= new Date((this.form.get("fechaInicial").value));
    this.fechaminima.setDate(this.fechaminima.getDate()+1);
  }



   remplazarMes_En_Es(fecha:String):String {
    var result: String
    var mes: String = fecha.substr(0,3);
    switch (mes){
      case 'Jan':
      result = fecha.replace('Jan','ene');
      break;
      case 'Apr':
      result = fecha.replace('Apr','abr');
      break;
      case 'Aug':
      result = fecha.replace('Aug','ago');
      break;
      case 'Dec':
      result = fecha.replace('Dec','dic');
      break;
      default:
        result= fecha;
    }
    return result;
  }

  remplazarMes_Es_En(fecha:String):String {
    var result: String
    var mes: String = fecha.substr(0,3);
    switch (mes){
      case 'ene':
      result = fecha.replace('ene','Jan');
      break;
      case 'abr':
      result = fecha.replace('abr','Apr');
      break;
      case 'ago':
      result = fecha.replace('ago','Aug');
      break;
      case 'dic':
      result = fecha.replace('dic','Dec');
      break;
      default:
        result= fecha;
    }
    return result;
  }

  get prefijo() { return this.form.get('prefijoFacturacion');}
  get rangoInicial() { return this.form.get('rangoInicial');}
  get rangoFinal() { return this.form.get('rangoFinal');}
  get fechaInicial() { return this.form.get('fechaInicial');}
  get fechaFinal() { return this.form.get('fechaFinal');}

  public consultarPrefijos(busquedaprefijo: IprefijoFacturacion): Promise<any>{
    return this.service.consultarPrefijoFacturacion(this.busquedaprefijo).toPromise()
}

  async buscarPrefijo(prefijo: string){
      var datos = JSON.parse( localStorage.getItem( "SSE" ) );
      this.busquedaprefijo= {idRegistro:0,
        nitPrestador: datos.numeroDocumentoPrestador, 
        tipoIdentificacion:datos.tipoDocumentoPrestador, 
        prefijoFacturacion:'',
        activo:'S',
        fechaInicial:'',
        fechaFinal:'',
        rangoInicial:'',
        rangoFinal:'',
        fechaCreacion:null,
        fechaModificacion:null
      };
  
      this.rangoFacturacion = await this.consultarPrefijos(this.busquedaprefijo)
      const a = this.rangoFacturacion.filter(rangoFacturacion=>
        rangoFacturacion.prefijoFacturacion==prefijo)
      if(a.length==1){
        this.openDialog(
          'Alerta',
          '',
          'El prefijo ya existe'
        );
      this.prefijoFacturacion=a[0];
      this.datosFormGroup(this.prefijoFacturacion.prefijoFacturacion, 
        this.prefijoFacturacion.rangoInicial,
        this.prefijoFacturacion.rangoFinal,
        this.remplazarMes_Es_En(this.prefijoFacturacion.fechaInicial.toString()),
        this.remplazarMes_Es_En(this.prefijoFacturacion.fechaFinal.toString())
        );
        this.fechaminima= new Date((this.form.get("fechaInicial").value));
        this.fechaminima.setDate(this.fechaminima.getDate()+1);
        this.modificarCodigo= false;
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
    
}
  


