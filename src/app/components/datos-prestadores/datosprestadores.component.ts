import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog'
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { IdatosPrestador } from '../datos-prestadores/model/datosprestador'
import { utilPrestadoresService } from './service/utilPrestadoresService';
import { IinfoPrestadores } from '../datos-prestadores/model/infoPrestador'
import { infoPrestadoresService} from '../datos-prestadores/service/infoPrestador.service'
import { ModalinfoprestadorComponent } from '../datos-prestadores/modals/modalinfoprestador/modalinfoprestador.component'
import { async } from 'rxjs/internal/scheduler/async';



@Component({
  selector: 'app-datos-prestadores',
  templateUrl: './datosprestadores.component.html',
  styles: [
  ]
})
export class DatosPrestadoresComponent {
  navLinks: any[];
  activeLinkIndex = -1;
  datosPrestador: IdatosPrestador;
  infoPrestador: IinfoPrestadores;
  error;
 
  constructor(
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
  this.consultarDatosSeccion()
  this.infoPrestador= {nitPrestador: this.datosPrestador.numeroDocumentoPrestador, 
    tipoIdentificacion: this.datosPrestador.tipoDocumentoPrestador,
    razonSocial: this.datosPrestador.razonSocial,
    representanteLegal:'',
    emailReperesentantelegal:''};

  this.ConsultarInfoPrestador();
}
ngAfterViewInit(): void {
  
}

consultarDatosSeccion(){
  
  this.utilService.getDatosPrestador()
  .subscribe(
       result => {
      this.datosPrestador= result;
      localStorage.setItem("SSE", JSON.stringify(this.datosPrestador));
    }, error=> this.error= error
  );
}

ConsultarInfoPrestador(){
  var datos = JSON.parse( localStorage.getItem( "SSE" ) );
  this.infoPrestador= { nitPrestador: datos.numeroDocumentoPrestador, 
    tipoIdentificacion: datos.tipoDocumentoPrestador,
    razonSocial: datos.razonSocial,
    representanteLegal:'',
    emailReperesentantelegal:''};
  this.infoPrestadoresService.ConsultarInfoPrestador(this.infoPrestador)
  .subscribe(
     (result) => {
      this.infoPrestador= result[0];
    }
  )
}

onCreate() {
  localStorage.setItem("infoPrestador", JSON.stringify(this.infoPrestador));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "40%";

  const dialogRef = this.dialog.open(ModalinfoprestadorComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      () => 
      this.ConsultarInfoPrestador()
  );    
}

}
