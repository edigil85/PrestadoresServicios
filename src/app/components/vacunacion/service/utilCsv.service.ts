import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatsValid } from '../model/formatsValid';

@Injectable({
  providedIn: 'root'
})
export class UtilCsvService {

  constructor(private httpClient: HttpClient) {
  }

  httpHeaders: HttpHeaders;
  
  baseUrl: string = environment.apiUrl;

  getFormats(): Observable<formatsValid> {
    if (environment.environment === 'local') {
      return this.httpClient.get<formatsValid>('./assets/json/formatsValid.json');
    } else {
      return this.httpClient.get<formatsValid>(`${this.baseUrl}/vacunacion/getExpresionesRegulares`,  {headers:environment.headers});
    }
  }

  getFormatsLocal(): Observable<formatsValid> {
      return this.httpClient.get<formatsValid>('./assets/json/formatsValid.json');
  }

}
