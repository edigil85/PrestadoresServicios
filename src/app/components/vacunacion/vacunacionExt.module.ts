import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { AgendaExternoVacunacionComponent } from "./components/agenda-externo-vacunacion/agenda-externo-vacunacion.component";
import { UploadFileCsvComponent } from "./components/upload-file/upload-fileCsv.component";
import { AgendaExtVacunacionService } from "./service/agenda-ext-vacunacion.service";
import { UtilCsvService } from "./service/utilCsv.service";
import { VacunacionExtRoutingModule } from "./vacunacionExt-routing.module";


@NgModule({
 /* declarations: [
    UploadFileCsvComponent, AgendaExternoVacunacionComponent]
    ,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule,
    HttpClientModule, VacunacionExtRoutingModule, MatDialogModule
  ],
  exports: [
    RouterModule,
    FormsModule
  ],
  providers: [UtilCsvService, AgendaExtVacunacionService] */
})
export class vacunacionExtModule { }