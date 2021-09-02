import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsultaPrestadoresComponent} from './consulta-prestadores.component';
import {FacturasRadicadasComponent} from './facturas-radicadas/facturas-radicadas.component';



const routes: Routes = [
    { path: '', component: ConsultaPrestadoresComponent,
      children: [
        { path: '', redirectTo: 'facturasRadicadas', pathMatch: 'full'},
        {path: 'facturasRadicadas',component: FacturasRadicadasComponent,},
      ],
    },
    ];
    
    @NgModule({
      imports: [RouterModule.forChild(routes),],
      exports: [RouterModule]
    })
    export class ConsultaPrestadoresRoutingModule { }