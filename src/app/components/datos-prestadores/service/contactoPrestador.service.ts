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
  
  consultarContactoPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  insertarContactoPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_CREAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  actualizarContactoPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_ACTUALIZAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  eliminarContactoPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_ELIMINAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  eliminarTodosContactosPrestador(params:IcontactoPrestador): Observable<any> {
    return this.httpClient.post<IcontactoPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_CONTACTOPRESTADOR_ELIMINARTODOS,
    JSON.stringify(params), {headers:environment.headers})
  }

}