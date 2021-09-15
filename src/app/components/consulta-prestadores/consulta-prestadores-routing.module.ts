import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsultaPrestadoresComponent} from './consulta-prestadores.component';
import {FacturasRadicadasComponent} from './facturas-radicadas/facturas-radicadas.component';
import {DevolucionesComponent} from './devoluciones/devoluciones.component';
import {GlosasComponent} from './glosas/glosas.component';




const routes: Routes = [
    { path: '', component: ConsultaPrestadoresComponent,
      children: [
        { path: '', redirectTo: 'facturasRadicadas', pathMatch: 'full'},
        {path: 'facturasRadicadas',component: FacturasRadicadasComponent},
        {path: 'devoluciones',component: DevolucionesComponent},
        {path: 'glosas',component: GlosasComponent},
      ],
    },
    ];
    
    @NgModule({
      imports: [RouterModule.forChild(routes),],
      exports: [RouterModule]
    })
    export class ConsultaPrestadoresRoutingModule { }