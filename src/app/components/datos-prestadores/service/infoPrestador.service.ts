import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IinfoPrestadores } from '../model/infoPrestador'
import { Constants } from '../../../shared/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class infoPrestadoresService{

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders;
  baseUrl: String = environment.apiUrl;

  consultarInfoPrestador(params:IinfoPrestadores): Observable<IinfoPrestadores> {
    return this.httpClient.post<IinfoPrestadores>(`${this.baseUrl}`+Constants.URI_SERVICE_INFOPRESTADOR_CONSULTA,
    JSON.stringify(params), {headers:environment.headers})
  }

  insertarInfoPrestador(params:IinfoPrestadores): Observable<any> {
    return this.httpClient.post<IinfoPrestadores>(`${this.baseUrl}`+Constants.URI_SERVICE_INFOPRESTADOR_CREAR,
    JSON.stringify(params), {headers:environment.headers})
  }

  actualizarInfoPrestador(params:IinfoPrestadores): Observable<any> {
    return this.httpClient.post<IinfoPrestadores>(`${this.baseUrl}`+Constants.URI_SERVICE_INFOPRESTADOR_ACTUALIZAR,
    JSON.stringify(params), {headers:environment.headers})
  }
}