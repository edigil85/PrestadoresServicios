import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconsultaFacturaRadicada } from '../model/consultaFacturasRadicada';
import { IfacturaRadicada } from '../model/facturasRadicadas';
import { Constants } from '../../../shared/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class facturasRadicadasService{

  constructor(private httpClient: HttpClient) {
  }
  httpHeaders: HttpHeaders;
  baseUrl: String = environment.apiUrl;

  consultarfacturaRadicada(params:IconsultaFacturaRadicada): Observable<any> {
    return this.httpClient.post<IconsultaFacturaRadicada>(`${this.baseUrl}`+Constants.URI_SERVICE_CONSULTA_FACTURASRADICADAS,
    JSON.stringify(params), {headers:environment.headers})
  }
  
}