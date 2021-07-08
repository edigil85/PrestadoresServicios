import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosPrestadoresComponent} from './datosprestadores.component'
import { SedesComponent} from './sedes/sedes.component';
import { RangofacturacionComponent } from './rangofacturacion/rangofacturacion.component';
import { CodigohabilitacionComponent } from './codigohabilitacion/codigohabilitacion.component';
import { DatoscontactoComponent } from './datoscontacto/datoscontacto.component';



const routes: Routes = [
{ path: '', component: DatosPrestadoresComponent,
  children: [
    //{ path: '', redirectTo: 'sedes', pathMatch: 'full'},
    {path: 'sedes',component: SedesComponent,},
    {path: 'rangofacturacion',component: RangofacturacionComponent,},
    {path: 'codigohabilitacion',component: CodigohabilitacionComponent,},
    {path: 'datoscontacto',component: DatoscontactoComponent,}
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class DatosPrestadoresRoutingModule { }
