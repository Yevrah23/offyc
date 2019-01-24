import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  // file from event.target.files[0]
  uploadFile(url: string, file: File, data): Observable<HttpEvent<any>> {
    console.log(data[0]);
    let formData = new FormData();
    formData.append('upload', file);
    formData.append('data',this.cookies.get('id'));

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
    // return this.http.post(url,);
  }
}