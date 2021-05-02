import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgendaExternoVacunacionComponent } from "./components/agenda-externo-vacunacion/agenda-externo-vacunacion.component";

const ADMIN_ROUTES: Routes = [
  
   // { path: '', redirectTo: 'agendamiento-vacunacion', pathMatch: 'full'},
    //{ path: 'agendamiento-vacunacion', component: AgendaExternoVacunacionComponent },
   // { path: '**', redirectTo: 'vacunacion' }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(ADMIN_ROUTES)],
    exports: [RouterModule]
  })
  export class VacunacionExtRoutingModule { }