import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  // file from event.target.files[0]
  uploadFile(file: FileList, type, folder): Observable<HttpEvent<any>> {
    const formData = new FormData();

    for (let index = 0; index < file.length; index++) {
      formData.append('upload'+index, file[index]);      
    }
    
    formData.append('id', this.cookies.get('id'));
    formData.append('file_type', type);
    formData.append('folder', folder);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', 'http://offyc.tk/codeigniter/api/Users/file_upload', formData, options);
    return this.http.request(req);
    // return this.http.post(url,);
  }
  
  moa_c(moa: File, cover: File, folder, proposal_id, user_id): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('moa', moa);
    formData.append('cover', cover);
    formData.append('id', this.cookies.get('id'));
    formData.append('user_id', user_id);
    formData.append('prop_id', proposal_id);
    formData.append('folder', folder);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', 'http://offyc.tk/codeigniter/api/Users/moa_c_upload', formData, options);
    return this.http.request(req);
    // return this.http.post(url,);
  }
}
