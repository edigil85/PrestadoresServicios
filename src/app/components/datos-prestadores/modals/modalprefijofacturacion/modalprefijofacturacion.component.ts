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
    prefijoFacturacion: new FormControl('', Validators.required),
    fechaInicial: new FormControl('', Validators.required),
    fechaFinal: new FormControl('', Validators.required),
  });

  prefijoFacturacion: IprefijoFacturacion;
  modificarCodigo: boolean= false;
  fechaminima: Date;

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
      this.prefijoFacturacion.fechaInicial,
      this.prefijoFacturacion.fechaFinal);
  }

  onSubmit() {
    // if (this.form.get('codigo'). value == this.codigoHabilitacion.codigoHabilitacion
    //   && this.form.get('descripcion'). value == this.codigoHabilitacion.descripcionServicio
    //   )
    //  {
    //   this.dialogRef.close();
    // }
    //  else{
    //   if(this.codigoHabilitacion.codigoHabilitacion == '' && this.codigoHabilitacion.descripcionServicio == '' ){
    //     this.codigoHabilitacion.codigoHabilitacion = this.form.get('codigo'). value;
    //     this.codigoHabilitacion.descripcionServicio = this.form.get('descripcion'). value;
    //     this.service.InsertarCodigoHabilitacion(this.codigoHabilitacion).subscribe(
    //       () => {
    //        this.dialogRef.close();
    //      }
    //    );
       
    //   }
    //   else{
    //     this.codigoHabilitacion.descripcionServicio = this.form.get('descripcion'). value;
    //     this.service.ActualizarCodigoHabilitacion(this.codigoHabilitacion).subscribe(
    //       () => {
    //        this.dialogRef.close();
    //      }
    //    );
       
    //   }
    //  }

  }

  DatosFormGroup(prefijoFacturacion: String, fechaInicial: String, fechaFinal: String){
    this.form.patchValue({
      prefijoFacturacion: prefijoFacturacion,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal
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
    this.prefijoFacturacion.fechaInicial= this.fechaminima.toLocaleDateString('en-US', 
    { year: 'numeric', month: 'short', day: 'numeric' });
    console.log(this.prefijoFacturacion);
  }
}
