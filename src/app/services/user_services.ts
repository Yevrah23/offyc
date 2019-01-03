import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface check{
    type: string,
    success: boolean
}

@Injectable()
export class UserServices {
    private serverUrl = 'http://localhost/';
    isLoggedIn: boolean;

    constructor(private http: HttpClient) { }

    getall() {
        return this.http.get(this.serverUrl + 'codeigniter/api/Users/getall');
        // return params;
        // return this.http.post(this.serverUrl + 'restserver-ci/api/user/users', {'params':params});
    }
    login(params) {
        // tslint:disable-next-line:max-line-length
        // console.log(params);
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/login', {'username': params[0].username, 'password' : params[0].password});
    }
    register(params) {
        // console.log(params[0]);
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/register', {
            'id' : params[0].id,
            'pass' : params[0].pass,
            'email' : params[0].email,
            'position' : params[0].position,
            'college' : params[0].college,
            'dept' : params[0].dept
        });
    }

    check_login(params){
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/check_login',{'token':params});
    }
    // logout(){
    //     return this.http.
    // }

}
