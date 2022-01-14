import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

//componentes de angular material
import { MatIconModule } from "@angular/material/icon";
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
//import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatExpansionModule} from '@angular/material/expansion'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { NgxSpinnerModule } from 'ngx-spinner';

//componentes del modulo
import {PaginatePipe } from './pipes/paginate.pipe'
import {CustomMatPaginatorIntl } from './pipes/paginate.es';
import {CustomDateAdapter} from '../datos-prestadores/custom.date.adapter';
import {ConsultaPrestadoresRoutingModule} from './consulta-prestadores-routing.module';
import {FacturasRadicadasComponent } from './facturas-radicadas/facturas-radicadas.component'
import {ConsultaPrestadoresComponent} from './consulta-prestadores.component';
import {GlosasComponent } from './glosas/glosas.component';
import {DevolucionesComponent } from './devoluciones/devoluciones.component'
import { SharedModule } from 'src/app/shared/components/SharedModule';



@NgModule({
    declarations: 
    [
        ConsultaPrestadoresComponent,
        PaginatePipe,
        FacturasRadicadasComponent,
        GlosasComponent,
        DevolucionesComponent,
    ],
    imports: [ 
        HttpClientModule,
        CommonModule,
        ConsultaPrestadoresRoutingModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        MatCardModule,
        MatDialogModule,
        MatGridListModule,
        //MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        NgxSpinnerModule,
        SharedModule
        ],
        providers: [
         { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl},
         { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
         { provide: DateAdapter, useClass: CustomDateAdapter }
         
       ]
    })
    export class ConsultasPrestadoresModule { }