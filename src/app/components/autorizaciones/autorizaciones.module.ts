import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudAutorizacionesComponent } from './solicitud-autorizaciones/solicitud-autorizaciones.component';
import { RouterModule, Routes } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { AutorizacionesRoutingModule } from './autorizaciones-routing.module';
import { UploadFileComponent } from 'src/app/shared/components/upload-file/upload-file.component';
import { AutorizacionesService } from './service/autorizaciones.service';
import { UploadFileService } from './service/upload-file.service';
import { ValidadoresService } from './service/validadores.service';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
 /* declarations: [SolicitudAutorizacionesComponent, UploadFileComponent
  ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule,
             MatDialogModule, AutorizacionesRoutingModule,NgxSpinnerModule,
           ],
  exports: [
              RouterModule,
              FormsModule
            ],
  providers: [AutorizacionesService, UploadFileService, ValidadoresService]*/
})
export class AutorizacionesModule { }
