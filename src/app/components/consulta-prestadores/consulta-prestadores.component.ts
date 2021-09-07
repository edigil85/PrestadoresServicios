import { Component, OnInit } from '@angular/core';
import {IdatosPrestador} from './model/datosPrestador';
import {utilPrestadoresService} from '../datos-prestadores/service/utilPrestadoresService';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UtilService} from '../../shared/service/util.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

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
    private dialog: MatDialog
  ) { }

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
