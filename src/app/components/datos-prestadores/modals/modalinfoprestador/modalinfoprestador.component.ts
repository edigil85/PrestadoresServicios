import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, FormGroupDirective, Validators, ValidatorFn, NgForm, FormBuilder, EmailValidator, AbstractControl } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { IinfoPrestadores } from '../../model/infoPrestador';
import { infoPrestadoresService} from '../../service/infoPrestador.service'
import { IdatosPrestador } from '../../model/datosprestador';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}



@Component({
  selector: 'app-modalinfoprestador',
  templateUrl: './modalinfoprestador.component.html',
  styleUrls: ['./modalinfoprestador.component.scss']
})

export class ModalinfoprestadorComponent implements OnInit {
   emailpattern ='(^[\\-_a-zA-Z0-9]+(\\.[\\-_a-zA-Z0-9]+)*@[a-zA-z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,4})$)|(^$)';
  form : FormGroup;
  infoPrestador: IinfoPrestadores;
  datosPrestador: IdatosPrestador;
  matcher = new MyErrorStateMatcher();


  constructor(
    public dialogRef: MatDialogRef<ModalinfoprestadorComponent>,
    private infoPrestadoresService: infoPrestadoresService,
    private formBuilder: FormBuilder){
      this.form = this.formBuilder.group({
        representanteLegal: ['', [Validators.required]],
        correoElectronico: ['', [Validators.required, Validators.maxLength(80), Validators.pattern(this.emailpattern)]],
        correConfirmacion: [''] 
      }, { validator: this.checkEmail }); 

  }

  ngOnInit(): void {
    this.infoPrestador = JSON.parse( localStorage.getItem( "infoPrestador" ) );
    this.datosFormGroup(this.infoPrestador.representanteLegal, this.infoPrestador.emailReperesentantelegal);
    localStorage.removeItem("infoPrestador");
  }

  checkEmail(group: FormGroup) {
    let pass = group.controls.correoElectronico.value;
    let confirmPass = group.controls.correConfirmacion.value;
    return pass === confirmPass ? null : { NoMacth: true }
  }

  initializeFormGroup() {
    this.form.setValue({
      representanteLegal: '',
      correoElectronico: '',
      correConfirmacion: ''
    });
  }

  datosFormGroup(nombreRepresentantelegal: String, correoElectronico: String){
    this.form.setValue({
      representanteLegal: nombreRepresentantelegal,
      correoElectronico: correoElectronico,
      correConfirmacion: correoElectronico
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.get('representanteLegal').value == this.infoPrestador.representanteLegal
      && this.form.get('correoElectronico'). value == this.infoPrestador.emailReperesentantelegal
      )
     {
      this.dialogRef.close();
    }
     else{
      if(this.infoPrestador.representanteLegal == '' && this.infoPrestador.emailReperesentantelegal == ''){
        this.infoPrestador.nitPrestador= this.datosPrestador.numeroDocumentoPrestador;
        this.infoPrestador.tipoIdentificacion= this.datosPrestador.tipoDocumentoPrestador;
        this.infoPrestador.razonSocial= this.datosPrestador.razonSocial;
        this.infoPrestador.representanteLegal = this.form.get('representanteLegal').value;
        this.infoPrestador.emailReperesentantelegal = this.form.get('correoElectronico'). value;
        this.infoPrestadoresService.insertarInfoPrestador(this.infoPrestador).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
      else{
        this.infoPrestador.representanteLegal = this.form.get('representanteLegal').value;
        this.infoPrestador.emailReperesentantelegal = this.form.get('correoElectronico'). value;
        this.infoPrestadoresService.actualizarInfoPrestador(this.infoPrestador).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
     }

  }

  get representanteLegal() { return this.form.get('representanteLegal');}
  get correoElectronico() { return this.form.get('correoElectronico');}
  get correConfirmacion() { return this.form.get('correConfirmacion');}

}
