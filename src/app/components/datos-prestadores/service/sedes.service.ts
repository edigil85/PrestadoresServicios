import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/utils/Constants';
import { Isedes } from '../model/sedes'

@Injectable({
  providedIn: 'root'
})
export class sedesservice{

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders;
  baseUrl: String = environment.apiUrl;

  consultarSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  insertarSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_CREAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  actualizarSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_ACTUALIZAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  eliminarSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_ELIMINAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  eliminarTodasSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_ELIMINARTODOS,
    JSON.stringify(params), {headers:environment.headers})
  }
  
}