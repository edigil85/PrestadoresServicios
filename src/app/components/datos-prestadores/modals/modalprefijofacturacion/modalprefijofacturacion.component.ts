import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  modificarCodigo: boolean= false;
  fechaminima: Date;
  fechaPaso: Date;
  matcher = new MyErrorStateMatcher();

  constructor(
    public service: prefijoFacturacionService,
    public dialogRef: MatDialogRef<ModalprefijofacturacionComponent>,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      prefijoFacturacion: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      rangoInicial: new FormControl('', Validators.required),
      rangoFinal: new FormControl('', Validators.required),
      fechaInicial: new FormControl('', Validators.required),
      fechaFinal: new FormControl('', Validators.required),
    }, { validator: this.checkRangos });
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
    this.DatosFormGroup(this.prefijoFacturacion.prefijoFacturacion, 
      this.prefijoFacturacion.rangoInicial,
      this.prefijoFacturacion.rangoFinal,
      this.RemplazarMes_Es_En(this.prefijoFacturacion.fechaInicial.toString()),
      this.RemplazarMes_Es_En(this.prefijoFacturacion.fechaFinal.toString())
      );
    this.fechaminima = this.form.get("fechaInicial").value;
  }

  onSubmit() {
    if (this.form.get('fechaFinal').value == this.RemplazarMes_Es_En(this.prefijoFacturacion.fechaFinal)
      
      )
     {
      this.dialogRef.close();
    }
     else{
      if(this.prefijoFacturacion.prefijoFacturacion == ''){
        this.prefijoFacturacion.prefijoFacturacion = this.form.get('prefijoFacturacion'). value;
        this.fechaPaso = this.form.get('fechaInicial'). value;
        this.prefijoFacturacion.fechaInicial= this.RemplazarMes_En_Es(this.fechaPaso.toLocaleDateString('en-US', 
        {  month: 'short', year: 'numeric', day: 'numeric' }));
        this.fechaPaso = this.form.get('fechaFinal'). value;
        this.prefijoFacturacion.fechaFinal= this.RemplazarMes_En_Es(this.fechaPaso.toLocaleDateString('en-US', 
        {  month: 'short', year: 'numeric', day: 'numeric' }));
        this.prefijoFacturacion.rangoInicial= this.form.get('rangoInicial').value
        this.prefijoFacturacion.rangoFinal= this.form.get('rangoFinal').value
        this.service.InsertarPrefijoFacturacion(this.prefijoFacturacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
      else{
        this.fechaPaso = this.form.get('fechaFinal'). value;
        this.prefijoFacturacion.fechaFinal= this.RemplazarMes_En_Es(this.fechaPaso.toLocaleDateString('en-US', 
        {  month: 'short', year: 'numeric', day: 'numeric' }));
        this.prefijoFacturacion.rangoFinal= this.form.get('rangoFinal').value
        this.service.ActualizarPrefijoFacturacion(this.prefijoFacturacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
     }

  }

  DatosFormGroup(prefijoFacturacion: String, rangoInicial: String, rangoFinal:String, fechaInicial: String, fechaFinal: String){
    this.form.patchValue({
      prefijoFacturacion: prefijoFacturacion,
      rangoInicial: rangoInicial,
      rangoFinal: rangoFinal,
      fechaInicial: new Date(fechaInicial.toString()),
      fechaFinal: new Date(fechaFinal.toString())
    });
  }

  checkRangos(group: FormGroup) { 
    let min = group.controls.rangoInicial.value;
    let max = group.controls.rangoFinal.value;
    return min < max ? null : { NoMacth: true }
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  initializeFormGroup() {
    this.form.setValue({
      prefijoFacturacion: '',
      rangoInicial:'',
      rangoFinal:'',
      fechaInicial: '',
      fechaFinal: ''
    });
  }

  cambioDia(){
    this.fechaminima = this.form.get("fechaInicial").value;
    this.fechaminima.setDate(this.fechaminima.getDate()+1);
  }

   RemplazarMes_En_Es(fecha:String):String {
    var result: String
    var mes: String = fecha.substr(0,3);
    switch (mes){
      case 'Jan':
      result = fecha.replace('Jan','Ene');
      break;
      case 'Apr':
      result = fecha.replace('Apr','Abr');
      break;
      case 'Aug':
      result = fecha.replace('Aug','Ago');
      break;
      case 'Dec':
      result = fecha.replace('Dec','Dic');
      break;
      default:
        result= fecha;
    }
    return result;
  }

  RemplazarMes_Es_En(fecha:String):String {
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


}
