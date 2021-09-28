import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconsultaDevoluciones } from '../model/consultaDevoluciones';
import { Idevoluviones } from '../model/devoluciones';
import { Constants } from '../../../shared/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class devolucionesService{

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders;
  baseUrl: String = environment.apiUrl;

  consultarDevoluciones(params:IconsultaDevoluciones): Observable<any> {
    return this.httpClient.post<IconsultaDevoluciones>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULTA_DEVOLUCIONES,
    JSON.stringify(params), {headers:environment.headers})
  }

}