import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IprefijoFacturacion } from '../model/prefijoFacturacion'
import { Constants } from '../../../shared/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class prefijoFacturacionService  {

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders;
  baseUrl: String = environment.apiUrl;

  consultarPrefijoFacturacion(params:IprefijoFacturacion): Observable<any> {
    return this.httpClient.post<IprefijoFacturacion>(`${this.baseUrl}`+Constants.URI_SERVICE_PREFIJOFACTURACION_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  insertarPrefijoFacturacion(params:IprefijoFacturacion): Observable<any> {
    return this.httpClient.post<IprefijoFacturacion>(`${this.baseUrl}`+Constants.URI_SERVICE_PREFIJOFACTURACION_CREAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  actualizarPrefijoFacturacion(params:IprefijoFacturacion): Observable<any> {
    return this.httpClient.post<IprefijoFacturacion>(`${this.baseUrl}`+Constants.URI_SERVICE_PREFIJOFACTURACION_ACTUALIZAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  eliminarPrefijoFacturacion(params:IprefijoFacturacion): Observable<any> {
    return this.httpClient.post<IprefijoFacturacion>(`${this.baseUrl}`+Constants.URI_SERVICE_PREFIJOFACTURACION_ELIMINAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  eliminarTodosPrefijosFacturacion(params:IprefijoFacturacion): Observable<any> {
    return this.httpClient.post<IprefijoFacturacion>(`${this.baseUrl}`+Constants.URI_SERVICE_PREFIJOFACTURACION_ELIMINARTODOS,
    JSON.stringify(params), {headers:environment.headers})
  }

}