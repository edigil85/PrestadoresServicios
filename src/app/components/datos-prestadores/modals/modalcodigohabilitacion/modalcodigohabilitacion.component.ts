import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IcodigoHabilitacion } from '../../model/codigoHabilitacion';
import { codigoHabilitacionService } from '../../service/codigosHabilitacion.service';

@Component({
  selector: 'app-modalcodigohabilitacion',
  templateUrl: './modalcodigohabilitacion.component.html',
  styleUrls: ['./modalcodigohabilitacion.component.css']
})
export class ModalcodigohabilitacionComponent implements OnInit {

  form: FormGroup = new FormGroup({
    codigo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });
  codigoHabilitacion: IcodigoHabilitacion;
  modificarCodigo: boolean= false;

  constructor(
    public service: codigoHabilitacionService,
    public dialogRef: MatDialogRef<ModalcodigohabilitacionComponent>,
  ) { }

  ngOnInit(): void {
    this.codigoHabilitacion= JSON.parse(localStorage.getItem('codigoHabilitacion'));
    localStorage.removeItem('codigoHabilitacion');
    if(this.codigoHabilitacion.codigoHabilitacion==''){
      this.modificarCodigo= true;
    }
    else{
      this.modificarCodigo= false;
    }
    this.DatosFormGroup(this.codigoHabilitacion.codigoHabilitacion, this.codigoHabilitacion.descripcionServicio);
  }

  onSubmit() {
    if (this.form.get('codigo'). value == this.codigoHabilitacion.codigoHabilitacion
      && this.form.get('descripcion'). value == this.codigoHabilitacion.descripcionServicio
      )
     {
      this.dialogRef.close();
    }
     else{
      if(this.codigoHabilitacion.codigoHabilitacion == '' && this.codigoHabilitacion.descripcionServicio == '' ){
        this.codigoHabilitacion.codigoHabilitacion = this.form.get('codigo'). value;
        this.codigoHabilitacion.descripcionServicio = this.form.get('descripcion'). value;
        this.service.InsertarCodigoHabilitacion(this.codigoHabilitacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
      else{
        this.codigoHabilitacion.descripcionServicio = this.form.get('descripcion'). value;
        this.service.ActualizarCodigoHabilitacion(this.codigoHabilitacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
     }

  }

  DatosFormGroup(codigo: String, descripcion: String ){
    this.form.patchValue({
      codigo: codigo,
      descripcion: descripcion
    });
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  initializeFormGroup() {
    this.form.setValue({
      codigo: '',
      descripcion: '',
    });
  }
}
