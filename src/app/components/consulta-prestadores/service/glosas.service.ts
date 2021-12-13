import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconsultaGlosa } from '../model/consultaGlosas';
import { Iglosas } from '../model/glosas';
import { Constants } from '../../../shared/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class glosasService{

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders; 
  baseUrl: String = environment.apiUrl;

  consultarGlosas(params:IconsultaGlosa): Observable<any> {
    return this.httpClient.post<IconsultaGlosa>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULTA_GLOSAS,
    JSON.stringify(params), {headers:environment.headers})
  }

  glosaPDF(params:Iglosas): Observable<Blob> {
    return this.httpClient.post<any>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULTA_GLOSASPDF, 
    JSON.stringify(params),   {headers:environment.headers, responseType: 'blob' as 'json'} )
  }

  glosaCSV(params:Iglosas): Observable<Blob> {
    return this.httpClient.post<any>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULTA_GLOSASCSV, 
    JSON.stringify(params),   {headers:environment.headers, responseType: 'blob' as 'json'} )
  }

  glosasTodosCSV(params:IconsultaGlosa): Observable<Blob> {
    return this.httpClient.post<any>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULTA_GLOSASTODOSCSV, 
    JSON.stringify(params),   {headers:environment.headers, responseType: 'blob' as 'json'} )
  }

}