import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class user_services {
    private serverUrl = "http://localhost/";

    constructor(private http: HttpClient) { }

    getall() {
        return this.http.get(this.serverUrl + 'codeigniter/api/Users/getall');
        //return params;
        //return this.http.post(this.serverUrl + 'restserver-ci/api/user/users', {'params':params});
    }
    login(params){
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/login',{'username': params[0].username, 'password' : params[0].password});
    }
    register(params){
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/register', {'data' : params[0]});
    }

}