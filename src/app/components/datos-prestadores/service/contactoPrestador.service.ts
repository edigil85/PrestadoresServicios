import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IcontactoPrestador } from '../model/contactoPrestador'
import { Constants } from '../../../shared/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class contactoPrestadorService {

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders;
  baseUrl: String = environment.apiUrl;
  
  ConsultarContactoPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  InsertarContactoPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  ActualizarContactoPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  EliminarContactoPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

}