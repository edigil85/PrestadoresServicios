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



//componentes del modulo
import { DatosPrestadoresRoutingModule } from './datosprestadores-routing.module';
import { DatosPrestadoresComponent } from './datosprestadores.component';
import { CodigohabilitacionComponent } from './codigohabilitacion/codigohabilitacion.component';
import { DatoscontactoComponent } from './datoscontacto/datoscontacto.component';
import { RangofacturacionComponent } from './rangofacturacion/rangofacturacion.component';
import { ModalcodigohabilitacionComponent } from './modals/modalcodigohabilitacion/modalcodigohabilitacion.component';
import { ModalcontactoprestadorComponent } from './modals/modalcontactoprestador/modalcontactoprestador.component';
import { ModalsedesComponent } from './modals/modalsedes/modalsedes.component';
import { ModalinfoprestadorComponent } from './modals/modalinfoprestador/modalinfoprestador.component';
import { ModalprefijofacturacionComponent } from './modals/modalprefijofacturacion/modalprefijofacturacion.component';
import { SedesComponent } from './sedes/sedes.component';
import { DeleteconfirmmodalComponent } from './modals/deleteconfirmmodal/deleteconfirmmodal.component';
import { PaginatePipe } from './pipes/paginate.pipe'
import { CustomMatPaginatorIntl } from './pipes/paginate.es';



@NgModule({
  declarations: 
  [DatosPrestadoresComponent,
   CodigohabilitacionComponent, 
   DatoscontactoComponent,
   RangofacturacionComponent,
   SedesComponent,
   ModalcodigohabilitacionComponent,
   ModalcontactoprestadorComponent,
   ModalsedesComponent,
   ModalinfoprestadorComponent,
   ModalprefijofacturacionComponent,
   DeleteconfirmmodalComponent,
   PaginatePipe
  ],
  imports: [ 
    HttpClientModule,
    CommonModule,
    DatosPrestadoresRoutingModule,
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
    MatPaginatorModule
    ],
    providers: [
     {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
   ]
})
export class DatosPrestadoresModule { }