import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { sedes, Isedes } from '../../model/sedes'
import { sedesservice } from '../../service/sedes.service'
import { utilPrestadoresService } from '../../service/utilPrestadoresService';
import { Iciudad } from '../../model/ciudad'
import { Idepartamento } from '../../model/departamento'

import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";



@Component({
  selector: 'app-modalsedes',
  templateUrl: './modalsedes.component.html',
  styleUrls: ['./modalsedes.component.scss']
})
export class ModalsedesComponent implements OnInit {

  form: FormGroup = new FormGroup({
    
  });

  listdepartamento: Idepartamento []= [];
  listdepartamento2: Idepartamento []= [];
  listciudades: Iciudad []=[];
  listSedes: Isedes[]=[];
  selectedDepartamento: Idepartamento;
  selectedSede: sedes = new sedes();
  ciudades : Iciudad;
  sede: Isedes;
  showCiudad: boolean= false;
  accionValida:boolean =true;

  constructor(
    public sedesservice: sedesservice,
    public dialogRef: MatDialogRef<ModalsedesComponent>,
    private utilService: utilPrestadoresService,
    private formBuilder: FormBuilder){
      this.form = this.formBuilder.group({
        idregistro: new FormControl(null),
        departamentoseleccionado: new FormControl(''),
        ciudad: new FormControl(''),
        direccion: new FormControl('', Validators.required),
      }); 
  }


  ngOnInit(): void {
    this.sede= JSON.parse(localStorage.getItem('sedeprestador'));
    localStorage.removeItem('sedeprestador');
    if(this.sede.idRegistro==0){
      this.obtenerDepartamento();
    }
    else{
      this.obtenerDepartamento();
      this.saberdepartamento(this.sede.departamento);
      this.datosFormGroup(this.sede.idRegistro,this.selectedDepartamento,this.sede.ciudad,this.sede.direccion);
    }
  }
  datosFormGroup(idregistro: Number, departamento: Idepartamento, ciudad: String, direccion: String){
    this.form.patchValue({
      idregistro: idregistro,
      departamentoseleccionado: departamento,
      ciudad: ciudad,
      direccion: direccion,
    });
  }
 
  saberdepartamento(departamento: String){
   this.utilService.getDepeartamento()
   .subscribe(data=>{
    this.selectedDepartamento = data.find(item=> item.nombreDepartamento==departamento)
    this.obtenerCiudad(this.selectedDepartamento);
    this.form.patchValue({
      departamentoseleccionado: this.selectedDepartamento,
    });
    this.showCiudad=true;
   });
      (error) => console.error(error)
    ;
  }

  compareFn (departamento1: Idepartamento, departamento2: Idepartamento) { 
    return departamento1 && departamento2? departamento1.codigoDepartamento === departamento2.codigoDepartamento: departamento1 === departamento2; 
}

  onClose() {
    this.accionValida=false;
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.accionValida){
    if (this.form.get('ciudad'). value == this.sede.ciudad
      && this.form.get('direccion'). value == this.sede.direccion
      )
     {
      this.dialogRef.close();
    }
     else{
      if(this.sede.departamento == '' && this.sede.ciudad == '' && this.sede.direccion == ''){
        this.selectedDepartamento = this.form.get('departamentoseleccionado').value;
        this.sede.departamento = this.selectedDepartamento.nombreDepartamento;
        this.sede.direccion = this.form.get('direccion'). value;
        this.sede.ciudad = this.form.get('ciudad'). value;
        this.sedesservice.insertarSedes(this.sede).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
      else{
        this.selectedDepartamento = this.form.get('departamentoseleccionado').value;
        this.sede.departamento = this.selectedDepartamento.nombreDepartamento;
        this.sede.direccion = this.form.get('direccion'). value;
        this.sede.ciudad = this.form.get('ciudad'). value;
        this.sedesservice.actualizarSedes(this.sede).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
     }
    }
  }

  obtenerDepartamento(){
    this.utilService.getDepeartamento().subscribe(
      (result: Idepartamento) => {
        this.listdepartamento=result;
      },
      (error) => console.error(error)
    );
  }

  obtenerCiudad(departamento: Idepartamento){
    this.utilService.getCiudad(departamento).subscribe((response:any) => {
      this.listciudades = response.body;
      },
      (error) => console.error(error)
    );
  }

  onSelectDepartamento():void{
    this.selectedDepartamento = this.form.get('departamentoseleccionado').value;
    this.obtenerCiudad(this.selectedDepartamento);
    this.showCiudad = true;
  }


  get direccion() { return this.form.get('direccion');}

}
