import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../../../shared/utils/Constants';
import { departamento } from '../../../shared/model/departamento';
import { ciudad } from '../../../shared/model/ciudad';
import { IdatosPrestador} from '../model/datosprestador'

@Injectable({
  providedIn: 'root'
})
export class utilPrestadoresService{

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders;
  baseUrl: String = environment.apiUrl;

  getDepeartamento(): Observable<any>{
    const body=null;
    return this.httpClient.post<departamento>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULTA_DEPARTAMENTO,
    body, {headers:environment.headers});
  }

  getCiudad(departamento: departamento): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(departamento)
    return this.httpClient.post<ciudad>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULTA_CIUDAD,
    body,{'headers':headers , observe: 'response' as 'body'})
    .pipe(map(ciudad=>{return ciudad}));
    
  }

  getDatosPrestador(): Observable<IdatosPrestador>{
    const body=null;
    return this.httpClient.post<IdatosPrestador>(`${this.baseUrl}`+Constants.URI_SERVICE_SECCION_DATA,
    body, {headers:environment.headers});
  }
 
}