import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IprefijoFacturacion } from '../../model/prefijoFacturacion';
import { prefijoFacturacionService } from '../../service/prefijoFacturacion.service';

@Component({
  selector: 'app-modalprefijofacturacion',
  templateUrl: './modalprefijofacturacion.component.html',
  styleUrls: ['./modalprefijofacturacion.component.css']
})
export class ModalprefijofacturacionComponent implements OnInit {

  form: FormGroup = new FormGroup({
    prefijoFacturacion: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    fechaInicial: new FormControl('', Validators.required),
    fechaFinal: new FormControl('', Validators.required),
  });

  prefijoFacturacion: IprefijoFacturacion;
  modificarCodigo: boolean= false;
  fechaminima: Date;
  fechaPaso: Date;

  constructor(
    public service: prefijoFacturacionService,
    public dialogRef: MatDialogRef<ModalprefijofacturacionComponent>,
  ) { }

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
        this.service.ActualizarPrefijoFacturacion(this.prefijoFacturacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
     }

  }

  DatosFormGroup(prefijoFacturacion: String, fechaInicial: String, fechaFinal: String){
    this.form.patchValue({
      prefijoFacturacion: prefijoFacturacion,
      fechaInicial: new Date(fechaInicial.toString()),
      fechaFinal: new Date(fechaFinal.toString())
    });
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  initializeFormGroup() {
    this.form.setValue({
      prefijoFacturacion: '',
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
}
