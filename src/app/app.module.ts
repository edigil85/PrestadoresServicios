import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AutorizacionesModule } from './components/autorizaciones/autorizaciones.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutorizacionesComponent } from './components/autorizaciones/autorizaciones.component';
import { SharedModule } from './shared/shared.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { UtilService } from './shared/service/util.service';
import { vacunacionExtModule } from './components/vacunacion/vacunacionExt.module';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { CommonModule } from '@angular/common';
import { UploadFileCsvComponent } from './components/vacunacion/components/upload-file/upload-fileCsv.component';
import { AgendaExternoVacunacionComponent } from './components/vacunacion/components/agenda-externo-vacunacion/agenda-externo-vacunacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { VacunacionExtRoutingModule } from './components/vacunacion/vacunacionExt-routing.module';
import { RouterModule } from '@angular/router';
import { UtilCsvService } from './components/vacunacion/service/utilCsv.service';
import { AgendaExtVacunacionService } from './components/vacunacion/service/agenda-ext-vacunacion.service';
import { SolicitudAutorizacionesComponent } from './components/autorizaciones/solicitud-autorizaciones/solicitud-autorizaciones.component';
import { UploadFileComponent } from './shared/components/upload-file/upload-file.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutorizacionesRoutingModule } from './components/autorizaciones/autorizaciones-routing.module';
import { AutorizacionesService } from './components/autorizaciones/service/autorizaciones.service';
import { UploadFileService } from './components/autorizaciones/service/upload-file.service';
import { ValidadoresService } from './components/autorizaciones/service/validadores.service';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    AutorizacionesComponent,
    ModalDialogComponent,

    //vacunacion
    UploadFileCsvComponent, AgendaExternoVacunacionComponent,

    //autorizaciones
    SolicitudAutorizacionesComponent, UploadFileComponent,
  ],
  
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule,
    AutorizacionesModule, SharedModule, vacunacionExtModule, MatDialogModule,
   CommonModule,
    //Material
    MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule,
    MatProgressBarModule, MatTabsModule, MatSelectModule, MatCheckboxModule,

    //vacunacion
     FormsModule, ReactiveFormsModule, NgxSpinnerModule,
     MatDialogModule

     //autorizaciones
     , MatAutocompleteModule,
         ],
  exports: [
    ModalDialogComponent,
    RouterModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    UtilService,

    //vacunacion
    UtilCsvService, 
    AgendaExtVacunacionService,

    //autorizaciones
    AutorizacionesService, UploadFileService, ValidadoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
