import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IcodigoHabilitacion } from '../model/codigoHabilitacion'
import { Constants } from '../../../shared/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class codigoHabilitacionService{

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders;
  baseUrl: String = environment.apiUrl;

  ConsultarCodigoHabilitacion(params:IcodigoHabilitacion): Observable<any> {
    return this.httpClient.post<IcodigoHabilitacion>(`${this.baseUrl}`+Constants.URI_SERVICE_CODIGOHABILITACION_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  InsertarCodigoHabilitacion(params:IcodigoHabilitacion): Observable<any> {
    return this.httpClient.post<IcodigoHabilitacion>(`${this.baseUrl}`+Constants.URI_SERVICE_CODIGOHABILITACION_CREAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  ActualizarCodigoHabilitacion(params:IcodigoHabilitacion): Observable<any> {
    return this.httpClient.post<IcodigoHabilitacion>(`${this.baseUrl}`+Constants.URI_SERVICE_CODIGOHABILITACION_ACTUALIZAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  EliminarCodigoHabilitacion(params:IcodigoHabilitacion): Observable<any> {
    return this.httpClient.post<IcodigoHabilitacion>(`${this.baseUrl}`+Constants.URI_SERVICE_CODIGOHABILITACION_ELIMINAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  EliminarTodosCodigosHabilitacion(params:IcodigoHabilitacion): Observable<any> {
    return this.httpClient.post<IcodigoHabilitacion>(`${this.baseUrl}`+Constants.URI_SERVICE_CODIGOHABILITACION_ELIMINARTODOS,
    JSON.stringify(params), {headers:environment.headers})
  }
  
}