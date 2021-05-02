import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudAutorizacionesComponent } from './components/autorizaciones/solicitud-autorizaciones/solicitud-autorizaciones.component';
import { AgendaExternoVacunacionComponent } from './components/vacunacion/components/agenda-externo-vacunacion/agenda-externo-vacunacion.component';

const routes: Routes = [

  /*{ path: '', redirectTo: 'solicitud-autorizaciones', pathMatch: 'full'},
  { path: 'solicitud-autorizaciones', component: SolicitudAutorizacionesComponent},*/
  { path: 'solicitud-autorizaciones', component: SolicitudAutorizacionesComponent },
  { path: 'agendamiento-vacunacion', component: AgendaExternoVacunacionComponent },
  { path: 'datos-prestadores', 
  loadChildren:() => import('./components/datos-prestadores/datosprestadores.module').then(m=> m.DatosPrestadoresModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }800190884
