import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog'
import { Router, ActivatedRoute  } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { IdatosPrestador } from '../datos-prestadores/model/datosprestador'
import { utilPrestadoresService } from './service/utilPrestadoresService';
import { IinfoPrestadores } from '../datos-prestadores/model/infoPrestador'
import { infoPrestadoresService} from '../datos-prestadores/service/infoPrestador.service'
import { ModalinfoprestadorComponent } from '../datos-prestadores/modals/modalinfoprestador/modalinfoprestador.component'
import { UtilService } from 'src/app/shared/service/util.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';


@Component({
  selector: 'app-datos-prestadores',
  templateUrl: './datosprestadores.component.html',
  styleUrls: [ './datosprestadores.component.scss'
  ]
})
export class DatosPrestadoresComponent {
  typeIndetification: any[] = [];
  navLinks: any[];
  activeLinkIndex = -1;
  datosPrestador: IdatosPrestador;
  infoPrestador: IinfoPrestadores;
  util: UtilService; 
  
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private utilService: utilPrestadoresService,
    private infoPrestadoresService: infoPrestadoresService,
    private dialog: MatDialog
    ) {
    this.matIconRegistry.addSvgIcon("edit",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-edit.svg"));
    this.matIconRegistry.addSvgIcon("add",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-add.svg"));
    this.matIconRegistry.addSvgIcon("adress-book",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-adress-book.svg"));
    this.matIconRegistry.addSvgIcon("code-check",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-code-check.svg"));
    this.matIconRegistry.addSvgIcon("invoice",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-invoice.svg"));
    this.matIconRegistry.addSvgIcon("email",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-mail.svg"));
    this.matIconRegistry.addSvgIcon("sedes",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-sedes.svg"));
    this.matIconRegistry.addSvgIcon("user",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/ic-user.svg"));
    this.matIconRegistry.addSvgIcon("delete",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/delete.svg"));
    this.matIconRegistry.addSvgIcon("module",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/module.svg"));
    this.matIconRegistry.addSvgIcon("list",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/list.svg"));
    this.matIconRegistry.addSvgIcon("filter_alt",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/filter_alt.svg"));
    this.matIconRegistry.addSvgIcon("close",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/close.svg"));
    this.matIconRegistry.addSvgIcon("phone",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/phone.svg"));
    this.matIconRegistry.addSvgIcon("notificacion",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/notificacion.svg"));
    this.matIconRegistry.addSvgIcon("lightbulb",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Iconos/iconos-prestadores/lightbulb.svg"));
    this.navLinks = [
        {
            label: 'Sedes',
            link: './sedes',
            icon: 'sedes',
            index: 0
        }, {
            label: 'Rangos de facturación',
            link: './rangofacturacion',
            icon: 'invoice',
            index: 1
        }, {
            label: 'Códigos de habilitación',
            link: './codigohabilitacion',
            icon: 'code-check',
            index: 2
        }, 
        {
          label: 'Datos de contacto',
          link: './datoscontacto',
          icon: 'adress-book',
          index: 3
      }, 
    ];
}

ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  this.datosPrestador= { tipoDocumentoPrestador:'', razonSocial:'', numeroDocumentoPrestador:'', tokenInformaticaCloud:''};
  this.consultarDatosSeccion();
  this.router.navigate(['sedes'], { relativeTo: this.route });
  this.infoPrestador= {nitPrestador: this.datosPrestador.numeroDocumentoPrestador, 
    tipoIdentificacion: this.datosPrestador.tipoDocumentoPrestador,
    razonSocial: this.datosPrestador.razonSocial,
    representanteLegal:'',
    emailReperesentantelegal:''};
}
ngAfterViewInit(): void {
}

consultarDatosSeccion(){
  this.utilService.getDatosPrestador()
  .subscribe(
     async  result => {
      this.datosPrestador= await result;
      localStorage.setItem("SSE", JSON.stringify(this.datosPrestador));
      this.obtenerTiposDocumentos(this.datosPrestador.tipoDocumentoPrestador);
      this.consultarInfoPrestador();
    },(error) => {
      this._getError(error); }
  ); 
}

consultarInfoPrestador(){
  var datos = JSON.parse( localStorage.getItem( "SSE" ) );
  this.infoPrestador= { nitPrestador: datos.numeroDocumentoPrestador, 
    tipoIdentificacion: datos.tipoDocumentoPrestador,
    razonSocial: datos.razonSocial,
    representanteLegal:'',
    emailReperesentantelegal:''};
  this.infoPrestadoresService.consultarInfoPrestador(this.infoPrestador)
  .subscribe(
     (result) => {
      this.infoPrestador= result[0];
    },(error) => {
      this._getError(error); }
  )
}

crear() {
  var datos = JSON.parse( localStorage.getItem( "SSE" ) );
  if(this.infoPrestador.nitPrestador===null){
  this.infoPrestador= { nitPrestador: datos.numeroDocumentoPrestador, 
    tipoIdentificacion: datos.tipoDocumentoPrestador,
    razonSocial: datos.razonSocial,
    representanteLegal:'',
    emailReperesentantelegal:''};
  }
  localStorage.setItem("infoPrestador", JSON.stringify(this.infoPrestador));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "40%";

  const dialogRef = this.dialog.open(ModalinfoprestadorComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      () => 
      this.consultarInfoPrestador()
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

obtenerTiposDocumentos(tipoDocumentoPrestador: String) {
  this.utilService.getDocumentTypes().subscribe(
   async (result) => {
      this.typeIndetification = await result;
      let documento=this.typeIndetification.find(item=> item.value==tipoDocumentoPrestador)
      this.datosPrestador.tipoDocumentoPrestador=documento.text;
    },
    (error) => console.error(error)
  );
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