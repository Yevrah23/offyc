import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServices } from '../services/user_services';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from '../modal/success/success.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // spiiner condition
  showPage = true;
  showSpinner: boolean;

  username: string;
  password: string;
  credentials = [];
  token: any;

  constructor(public http: HttpClient, private user: UserServices, private router: Router, private cookies: CookieService,
               public acRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.cookies.deleteAll('/','localhost');
    console.log(this.user.isLoggedIn);
    if (this.user.isLoggedIn){
      this.router.navigate(['/', this.cookies.get('id')]);
    }else{
      this.router.navigate(['/']);
    }
  }
  
  showSuccess(page,message,status): void {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '435px',
      panelClass: 'custom-dialog-success',
      data: {
        page: page,
        message: message,
        status: status
      }
    });
  }

  login_user() {
    this.credentials.push({ 'username': this.username, 'password': this.password });
    this.user.login(this.credentials).subscribe(
      (response) => { 
        console.log(response);
        this.credentials = [];
        if (response[0]) {
          this.showSuccess('frmLogin', response['message'], true);
          this.user.isLoggedIn = true;
          this.cookies.set('id', response[1].user_school_id);
          this.cookies.set(response[1].user_school_id, response[3]);
          this.showPage = true;
          this.showSpinner = false;
          // this.router.navigate(['/', 'admin']);
          this.router.navigate(['/', response[1].user_school_id]);
          //   // this.router.navigate(['/', 'admin']);
          }else{
            this.showSuccess('frmLogin', response['message'],false);
        }
      }
    );
  }


}

// my commit
