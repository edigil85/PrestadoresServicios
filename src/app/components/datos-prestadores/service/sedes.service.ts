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

  ConsultarSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  InsertarSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_CREAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  ActualizarSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_ACTUALIZAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  EliminarSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_ELIMINAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  EliminarTodasSedes(params:Isedes): Observable<any> {
    return this.httpClient.post<Isedes>(`${this.baseUrl}`+Constants.URI_SERVICE_SEDES_ELIMINARTODOS,
    JSON.stringify(params), {headers:environment.headers})
  }
  
}