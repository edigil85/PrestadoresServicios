import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IcontactoPrestador } from '../../model/contactoPrestador';
import { contactoPrestadorService } from '../../service/contactoPrestador.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

export function matchOtherValidator (otherControlName: string) {
  let thisControl: FormControl;
  let otherControl: FormControl;
  return function matchOtherValidate (control: FormControl) {
    if (!control.parent) {
      return null;
    }
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }
    if (!otherControl) {
      return null;
    }
    if (otherControl.value !== thisControl.value) {
      return {
        matchOther: true
      };
    }
    return null;
  }
}



@Component({
  selector: 'app-modalcontactoprestador',
  templateUrl: './modalcontactoprestador.component.html',
  styleUrls: ['./modalcontactoprestador.component.scss']
})
export class ModalcontactoprestadorComponent implements OnInit {
  emailpattern ='(^[\\-_a-zA-Z0-9]+(\\.[\\-_a-zA-Z0-9]+)*@[a-zA-z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,4})$)|(^$)';
  notificacionGlosa: boolean= false;
  notificacionDevoluciones: boolean = false;
  notificacionCartera: boolean = false;
  Checked: boolean = false;
  form : FormGroup;
  IniContactoPrestador: IcontactoPrestador;
  FinalContactoPrestador: IcontactoPrestador;
  matcher = new MyErrorStateMatcher();
  accionValida:boolean =true;

  constructor(
    public service: contactoPrestadorService,
    public dialogRef: MatDialogRef<ModalcontactoprestadorComponent>,
    private formBuilder: FormBuilder
  ) 
  { 
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$|^[0-9]{7}$'), Validators.minLength(7), Validators.maxLength(10)]),
      emailNotificacion: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.pattern(this.emailpattern)]),
      correConfirmacion: new FormControl('', [Validators.required,  matchOtherValidator('emailNotificacion')])
    });
  }

  ngOnInit(): void {
    this.IniContactoPrestador= JSON.parse(localStorage.getItem('contactoPrestador'));
    this.FinalContactoPrestador= JSON.parse(localStorage.getItem('contactoPrestador'));
    localStorage.removeItem('contactoPrestador');
    this.datosFormGroup(this.IniContactoPrestador.emailNotificacion,
      this.IniContactoPrestador.nombre,
      this.IniContactoPrestador.telefono);
    if (this.IniContactoPrestador.notificacionGlosa=='S'){
      this.notificacionGlosa= true;
      this.Checked= true;
    }
    if (this.IniContactoPrestador.notificacionDevoluciones=='S'){
      this.notificacionDevoluciones= true;
      this.Checked= true;
    }
    if (this.IniContactoPrestador.notificacionCartera=='S'){
      this.notificacionCartera= true;
      this.Checked= true;
    }
    this.validarChecks();
  }

  onSubmit() {
    if(this.accionValida){
    //Capturar los valores en FinalContactoPrestador
    this.capturarFormulario();


    if (this.compararContactos()
      )
     {
      this.dialogRef.close();
    }
     else{
      if(this.IniContactoPrestador.nombre=='' && this.IniContactoPrestador.emailNotificacion =='' && this.IniContactoPrestador.telefono == ''){
        this.service.insertarContactoPrestador(this.FinalContactoPrestador).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
      else{
        this.service.actualizarContactoPrestador(this.FinalContactoPrestador).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
     }
    }
  }

  datosFormGroup(emailNotificacion: String, nombre: String, telefono: String ){
    this.form.patchValue({
      emailNotificacion: emailNotificacion,
      correConfirmacion: emailNotificacion,
      nombre: nombre,
      telefono: telefono
    });
  }

  cerrar() {
    this.accionValida=false;
    this.dialogRef.close();
  }

  initializeFormGroup() {
    this.form.patchValue({
      emailNotificacion: '',
      correConfirmacion: '',
      nombre: '',
      telefono: ''
    });
  }

  capturarFormulario(){
    this.FinalContactoPrestador.nombre= this.form.get('nombre').value;
    this.FinalContactoPrestador.emailNotificacion= this.form.get('emailNotificacion').value;
    this.FinalContactoPrestador.telefono= this.form.get('telefono').value;
    this.FinalContactoPrestador.fechaCreacion=null;
    this.FinalContactoPrestador.fechaModificacion=null;
  }

  compararContactos(): boolean{
    if (
      this.IniContactoPrestador.nombre == this.FinalContactoPrestador.nombre 
      && this.IniContactoPrestador.telefono == this.FinalContactoPrestador.telefono 
      && this.IniContactoPrestador.emailNotificacion == this.FinalContactoPrestador.emailNotificacion 
      && this.IniContactoPrestador.notificacionCartera == this.FinalContactoPrestador.notificacionCartera 
      && this.IniContactoPrestador.notificacionDevoluciones == this.FinalContactoPrestador.notificacionDevoluciones 
      && this.IniContactoPrestador.notificacionGlosa == this.FinalContactoPrestador.notificacionGlosa 
    )
    {
      return true;
    }
    return false;
  }

  notiGlosa(e: any){
    if(e.checked){
      this.FinalContactoPrestador.notificacionGlosa='S'
    }
    else{
      this.FinalContactoPrestador.notificacionGlosa='N'
    }
    this.validarChecks();
  }

  notiDevoluciones(e: any){
    if(e.checked){
      this.FinalContactoPrestador.notificacionDevoluciones='S'
    }
    else{
      this.FinalContactoPrestador.notificacionDevoluciones='N'
    }
    this.validarChecks();
  }

  notiCartera(e: any){
    if(e.checked){
      this.FinalContactoPrestador.notificacionCartera='S'
    }
    else{
      this.FinalContactoPrestador.notificacionCartera='N'
    }
    this.validarChecks();
  }

  validarChecks(){
    if(this.FinalContactoPrestador.notificacionGlosa=='S' 
    || this.FinalContactoPrestador.notificacionDevoluciones=='S'
    || this.FinalContactoPrestador.notificacionCartera=='S'){
      this.Checked=true;
    }
    else{
      this.Checked=false;
    }
  }

  get nombre() { return this.form.get('nombre');}
  get telefono() { return this.form.get('telefono');}
  get emailNotificacion() { return this.form.get('emailNotificacion');}
  get correConfirmacion() { return this.form.get('correConfirmacion');}
}
