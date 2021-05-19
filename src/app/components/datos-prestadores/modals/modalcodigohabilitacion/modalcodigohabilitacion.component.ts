import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IcodigoHabilitacion } from '../../model/codigoHabilitacion';
import { codigoHabilitacionService } from '../../service/codigosHabilitacion.service';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-modalcodigohabilitacion',
  templateUrl: './modalcodigohabilitacion.component.html',
  styleUrls: ['./modalcodigohabilitacion.component.scss']
})
export class ModalcodigohabilitacionComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  form: FormGroup = new FormGroup({
    codigo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(20)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
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
    this.datosFormGroup(this.codigoHabilitacion.codigoHabilitacion, this.codigoHabilitacion.descripcionServicio);
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
        this.service.insertarCodigoHabilitacion(this.codigoHabilitacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
      else{
        this.codigoHabilitacion.descripcionServicio = this.form.get('descripcion'). value;
        this.service.actualizarCodigoHabilitacion(this.codigoHabilitacion).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
     }

  }

  datosFormGroup(codigo: String, descripcion: String ){
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


  get codigo() { return this.form.get('codigo');}
  get descripcion() { return this.form.get('descripcion');}
}
