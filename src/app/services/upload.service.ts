import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  // file from event.target.files[0]
  uploadFile(file: File, type,folder): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append('upload', file);
    formData.append('id',this.cookies.get('id'));
    formData.append('file_type', type);
    formData.append('folder',folder);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', 'http://192.168.0.11/codeigniter/api/Users/file_upload', formData, options);
    return this.http.request(req);
    // return this.http.post(url,);
  }
}