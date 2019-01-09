import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServices } from '../services/user_services';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  credentials = [];

  constructor(public http: HttpClient, private user: UserServices, private router: Router, private cookies: CookieService,
               public acRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.cookies.get('id').length > 0) {
      this.cookies.set('random', '0x23c4eeqceac23cqcqwc4c3');
      this.router.navigate(['/', this.cookies.get('id')]);
    }else{
      this.cookies.set('random', '');   
    }
  }

  login_user() {
    this.credentials.push({'username': this.username, 'password': this.password});
    this.user.login(this.credentials).subscribe(
      (response) => {
        this.credentials = [];
        if (response[0]) {
          console.log('Logged In');
          this.cookies.set('random', '1x1784c89488ceec89a2');
          this.cookies.set(response[1].user_school_id, response[3]);
          this.cookies.set('id', response[1].user_school_id);
          // this.router.navigate(['/', 'admin']);
          this.router.navigate(['/', response[1].user_school_id]);
          if (response[1].user_type === '2') {
            this.user.admin = false;
            this.user.user = true;
          } else if (response[1].user_type === '1'){
            this.user.admin = true;
            this.user.user = false;
          }
        }
      }
    );
  }


}

// my commit
