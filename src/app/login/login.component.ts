import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServices } from '../services/user_services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  credentials = [];

  constructor(public http: HttpClient, private user: UserServices) { }

  ngOnInit() {
  }

  login_user() {
    this.credentials.push({'username': this.username, 'password': this.password});
    this.user.login(this.credentials).subscribe(
      (response) => { 
        this.credentials = [];
        if(response[0]){
          console.log('Logged In');
          if(response[1].user_type == "2"){
            console.log("Hello Admin");
            
          }         
        }
      }
    );
  }
}

// my commit
