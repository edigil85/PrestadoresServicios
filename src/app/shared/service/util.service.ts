import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Constants } from '../utils/Constants';
import { interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  streets: string[];
  interval;
  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders(environment.headers);
  }

  httpHeaders: HttpHeaders;
  apiUrl: string = environment.apiUrl;

  getDocumentTypes(): Observable<any> {
    return this.httpClient.get('./assets/json/tipos_documento.json');
  }

  getListRequestPAC(): Observable<any> {
    return this.httpClient.get('./assets/json/lista_solicitudes_pac.json');
  }

  getListrequestPBS(): Observable<any> {
    return this.httpClient.get('./assets/json/lista_solicitudes_pbs.json');
  }

  getListCIE10(): Observable<any> {
    if (environment.environment === 'local') {
      return this.httpClient.get<any>(`./assets/json/mock/cie10.json`);
    } else {
      return this.httpClient.get<any>(`${this.apiUrl}` + Constants.URI_SERVICE_CIE10);
    }
  }

  getListCUPS(): Observable<any> {
    if (environment.environment === 'local') {
      return this.httpClient.get<any>('./assets/json/mock/cups.json');
    } else {
      return this.httpClient.get<any>(`${this.apiUrl}` + Constants.URI_SERVICE_CONSULT_PROCEDURES);
    }
  }

  getListMedicineOther(): Observable<any> {
    return this.httpClient.get('./assets/json/mock/medicamentos.json').pipe(
      map((resp: any[]) =>
        resp.map(m => (m.descripcion)
        )
      )
    );
  }

  getListMedicine(): Observable<any> {
    if (environment.environment === 'local') {
      return this.httpClient.get<any>('../assets/json/mock/medicamentos.json');
    } else {
    return this.httpClient.get<any>(`${this.apiUrl}` + Constants.URI_SERVICE_CONSULT_MEDICATIONS);
    }
  }

  getPaises(): Observable<any[]> {

    return this.httpClient.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map((resp: any[]) =>
          resp.map(pais => (pais.name)
          )
        )
      );
  }

  'Comun??quese con el usuario para verificar su estado de afiliaci??n.'


  showMessageError(param) {
    let msg;
    switch (param.trim()) {
      case 'AUT009':
        msg = 'Comun??quese con el usuario para verificar su estado de afiliaci??n.';
        break;
      case 'AUT006':
        msg = 'El campo Correo electr??nico debe ser un mail v??lido';
        break;
      case 'AUT007':
        msg = 'El campo N??mero de tel??fono fijo debe ser un n??mero v??lido';
        break;
      case 'AUT008':
        msg = 'El campo N??mero celular debe ser un n??mero v??lido';
        break;
      case 'AUT010':
        msg = 'El servicio no est?? disponible en este momento, por favor intente nuevamente m??s tarde.';
        break;
      case 'AUT011':
        msg = 'El servicio no est?? disponible en este momento, por favor intente nuevamente m??s tarde.';
        break;
      case 'AUT013':
        msg = 'El archivo cargado no cumple con el tama??o y/o tipo de extensiones permitidas.';
        break;
      case 'AUT014':
        msg = 'Ocurri?? un error consultando los diagn??sticos, por favor intente nuevamente m??s tarde.';
        break;
      case 'AUT015':
        msg = 'Ocurri?? un error consultando los medicamentos, por favor intente nuevamente m??s tarde.';
        break;
      case 'AUT016':
        msg = 'Ocurri?? un error consultando los procedimientos, por favor intente nuevamente m??s tarde.';
        break;
      case 'AUT017':
        msg = 'Ocurri?? un error consultando los procedimientos, por favor intente nuevamente m??s tarde.';
        break;
      case 'AUT018':
        msg = 'Ocurri?? un error consultando los procedimientos, por favor intente nuevamente m??s tarde.';
        break;
    }
    return msg;
  }


}
