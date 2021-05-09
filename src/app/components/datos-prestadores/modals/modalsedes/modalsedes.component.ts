import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { sedes, Isedes } from '../../model/sedes'
import { sedesservice } from '../../service/sedes.service'
import { utilPrestadoresService } from '../../service/utilPrestadoresService';
import { Iciudad } from '../../model/ciudad'
import { Idepartamento } from '../../model/departamento'

import { FormGroup, FormControl, Validators } from "@angular/forms";



@Component({
  selector: 'app-modalsedes',
  templateUrl: './modalsedes.component.html',
  styleUrls: ['./modalsedes.component.css']
})
export class ModalsedesComponent implements OnInit {

  form: FormGroup = new FormGroup({
    idregistro: new FormControl(null),
    departamentoseleccionado: new FormControl(''),
    ciudad: new FormControl(''),
    direccion: new FormControl('', Validators.required),
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

  constructor(
    public sedesservice: sedesservice,
    public dialogRef: MatDialogRef<ModalsedesComponent>,
    private utilService: utilPrestadoresService,
  ) { 

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
      this.DatosFormGroup(this.sede.idRegistro,this.selectedDepartamento,this.sede.ciudad,this.sede.direccion);
      //this.obtenerCiudad();
    }
  }
  DatosFormGroup(idregistro: Number, departamento: Idepartamento, ciudad: String, direccion: String){
    this.form.patchValue({
      idregistro: idregistro,
      departamentoseleccionado: departamento,
      ciudad: ciudad,
      direccion: direccion,
    });
  }
 

  initializeFormGroup() {
    this.form.setValue({
      idregistro: '',
      departamentoseleccionado: '',
      ciudad: '',
      direccion: '',
    });
  }

  saberdepartamento(departamento: String){
   this.utilService.getDepeartamento()
   .subscribe(data=>{
    this.selectedDepartamento = data.find(item=> item.nombreDepartamento==departamento)
   });
      (error) => console.error(error)
    ;
    console.log(this.selectedDepartamento);
      this.obtenerCiudad();
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit() {
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
        this.sedesservice.InsertarSedes(this.sede).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
      }
      else{
        this.selectedDepartamento = this.form.get('departamentoseleccionado').value;
        this.sede.departamento = this.selectedDepartamento.nombreDepartamento;
        this.sede.direccion = this.form.get('correoEleciudadctronico'). value;
        this.sede.ciudad = this.form.get('ciudad'). value;
        this.sedesservice.ActualizarSedes(this.sede).subscribe(
          () => {
           this.dialogRef.close();
         }
       );
       
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

  obtenerCiudad(){
    this.utilService.getCiudad(this.selectedDepartamento).subscribe((response:any) => {
      this.listciudades = response.body;
      },
      (error) => console.error(error)
    );
  }

  onSelectDepartamento():void{
    this.selectedDepartamento = this.form.get('departamentoseleccionado').value;
    this.obtenerCiudad();
    this.showCiudad = true;
  }

}
