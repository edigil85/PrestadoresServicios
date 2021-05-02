import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FileResponse } from '../model/FileResponse';
import { environment } from 'src/environments/environment';
import { Constants } from '../../../shared/utils/Constants';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) {
  }

  httpHeaders: HttpHeaders;
  baseUrl: string = environment.apiUrl;

  upload(file: FormData): Observable<FileResponse> {
    if(environment.environment === 'local'){
      return this.httpClient.get<FileResponse>(`${this.baseUrl}`+Constants.URI_SERVICE_UPLOAD_FILE_P8+'.json');
    }else{
    const header = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Credentials': 'true'
    };
    return this.httpClient.post<FileResponse>(`${this.baseUrl}`+Constants.URI_SERVICE_UPLOAD_FILE_P8,
     file);
   }
  }

  delete(id: string): Observable<boolean> {
    if(environment.environment === 'local'){
      return this.httpClient.get<boolean>(`${this.baseUrl}`+'/mock/deleteFile.json');
  
    }else{
    const header = {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Credentials': 'true'
    };
    return this.httpClient.delete<boolean>(`${this.baseUrl}`+ Constants.URI_SERVICE_DELETE_FILE_P8 +id, { headers: header });
  }
}

}
