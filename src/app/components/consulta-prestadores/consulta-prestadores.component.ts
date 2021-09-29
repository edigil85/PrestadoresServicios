import { Component, OnInit } from '@angular/core';
import {IdatosPrestador} from './model/datosPrestador';
import {utilPrestadoresService} from '../datos-prestadores/service/utilPrestadoresService';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UtilService} from '../../shared/service/util.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-consulta-prestadores',
  templateUrl: './consulta-prestadores.component.html',
  styleUrls: ['./consulta-prestadores.component.scss']
})
export class ConsultaPrestadoresComponent implements OnInit {


  datosPrestador: IdatosPrestador;
  util: UtilService;

  constructor(
    private utilService: utilPrestadoresService,
    private dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon("user",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-user.svg"));
    this.matIconRegistry.addSvgIcon("exportPDF",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/pdf-file-ic.svg"));
    this.matIconRegistry.addSvgIcon("exportCSV",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/file-csv-light.svg"));

    this.matIconRegistry.addSvgIcon("mas",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/plus-ic.svg"));
    this.matIconRegistry.addSvgIcon("check",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/check-circle-ic.svg"));
    this.matIconRegistry.addSvgIcon("vencido",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/close-circle-ic.svg"));
    this.matIconRegistry.addSvgIcon("alerta",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/warning-ic.svg"));
    
   }

  ngOnInit(): void {
    this.datosPrestador= { tipoDocumentoPrestador:'', razonSocial:'', numeroDocumentoPrestador:'', tokenInformaticaCloud:''};
    this.consultarDatosSeccion();
  }

  consultarDatosSeccion(){
    this.utilService.getDatosPrestador()
    .subscribe(
       async  result => {
        this.datosPrestador= await result;
        localStorage.setItem("SSE", JSON.stringify(this.datosPrestador));
      },(error) => {
        this._getError(error); }
    ); 
  }

  openDialog(pTittle, pSubtittle, pMessage) {
    this.dialog.open(ModalDialogComponent, {
      data: {
        tittle: pTittle,
        subtittle: pSubtittle,
        message: pMessage,
      },
    });
  }

  _getError(error) {
    if (error.status === 500) {
      this.openDialog(
        'Mensaje Error',
        '',
        'Ocurrió un error en el servicio, por favor intente más tarde.'
      );
    } else if (error.status === 401) {
      this.openDialog(
        'Mensaje Error',
        '401',
        'Su sesión ha terminado, por favor inicia nuevamente.'
      );
  
    } else if (error.error.frontEndErrorCode != undefined) {
      this.openDialog(
        'Mensaje Error',
        '',
        this.util.showMessageError(error.error.frontEndErrorCode)
      );
    }

  }


}
