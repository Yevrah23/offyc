import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user_services } from '../services/user_services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  credentials = [];

  constructor(public http: HttpClient, private user: user_services) { }

  ngOnInit() {
  }

   
  login_user(){
    this.credentials.push({'username':this.username,'password':this.password})
    this.user.login(this.credentials).subscribe(
      (response) => {console.log(response)}
    );
  }
}

// my commit

