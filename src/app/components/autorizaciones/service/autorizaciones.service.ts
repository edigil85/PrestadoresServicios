import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Afiliado } from 'src/app/shared/model/Afiliado';
import { SolicitudAutorizacion } from 'src/app/shared/model/SolicitudAutorizacion';
import { environment } from 'src/environments/environment';
import { Constants } from '../../../shared/utils/Constants';
import { SolicitudAutorizacionPpal } from '../../../shared/model/SolicitudAutorizacionPpal';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionesService {
  
  constructor(private httpClient: HttpClient) {
  }

  httpHeaders: HttpHeaders;
  baseUrl: string = environment.apiUrl;
  getAffiliateJson(): Observable<any> {
    return this.httpClient.get('./assets/json/afiliados.json');
  }

  sendAuthorizationRequest(params:SolicitudAutorizacionPpal): Observable<any> {
    if(environment.environment === 'local'){
      return this.httpClient.get(`${this.baseUrl}`+Constants.URI_SERVICE_SETTLE_APPLICATION+'.json');
    }else{
      return this.httpClient.post<any>(`${this.baseUrl}`+Constants.URI_SERVICE_SETTLE_APPLICATION,
      JSON.stringify(params), {headers:environment.headers})
    }
  }

  
  findAffiliate(documentType: string, documentNumber: string) {
    if(environment.environment === 'local'){
      return this.httpClient.get<Afiliado>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULT_BASIC_DATA+'.json');
    }else{
    const params = {'tipoDocumento': documentType.toUpperCase(), 'numeroDocumento': documentNumber.trim()}
    return this.httpClient.post<Afiliado>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULT_BASIC_DATA,
    JSON.stringify(params) , {headers:environment.headers})
   }
  }
}
