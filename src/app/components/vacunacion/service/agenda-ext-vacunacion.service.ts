import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfoUploadFile } from '../model/InfoUploadFile';

@Injectable({
  providedIn: 'root'
})
export class AgendaExtVacunacionService {

  constructor(private httpClient: HttpClient) {
  }

  httpHeaders: HttpHeaders;
  baseUrl: string = environment.apiUrl;

  getUrlCarga(action: string): Observable<InfoUploadFile> {
    if (environment.environment === 'local') {
      return this.httpClient.get<InfoUploadFile>(`${this.baseUrl}/vacunacion/getUrlCarga` + '.json');
    } else {
      return this.httpClient.post<InfoUploadFile>(`${this.baseUrl}/vacunacion/getUrlCarga`,
        {
          "tipoArchivo": action
        }

      );
    }
  }

  upload(infoUpload: InfoUploadFile, document: Blob): Observable<any> {
    const header = {
      'x-ms-blob-type': 'Blockblob',
      'x-ms-blob-content-type': document.type,
      'Access-Control-Allow-Credentials': 'true'
    };
    console.log(document.type)

    const headers = new HttpHeaders({ 'x-ms-blob-type': 'Blockblob', 'x-ms-blob-content-type': document.type })
    let requestBody = '<?xml version=\'1.0\' encoding=\'utf-8\'?><BlockList>'


    if (environment.environment === 'local') {
      return this.httpClient.get<boolean>(`${this.baseUrl}` + '/mock/deleteFile.json');
    } else {
      return this.httpClient.put<any>(infoUpload.uriCargaArchivo,
        document, { headers: headers });
    }
  }

}
