import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServices } from '../services/user_services';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from '../modal/success/success.component';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Form Validation
  loginVal: FormGroup;

  attempt = 0;
  lockout = false;

  // spiiner condition
  showPage = true;
  showSpinner: boolean;

  username: string;
  password: string;
  credentials = [];
  token: any;

  constructor(public http: HttpClient,
    private user: UserServices,
    private router: Router,
    private cookies: CookieService,
    public acRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder
    ) { }

  ngOnInit() {
     // Form Validation angular
     this.loginVal = this._formBuilder.group({
      loginUser: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      loginPass: ['', [Validators.required]],
    });

    console.log(this.user.isLoggedIn);
    if (this.user.isLoggedIn) {
      this.router.navigate(['/', this.cookies.get('id')]);
    } else {
      this.cookies.deleteAll('/', 'localhost');
      this.router.navigate(['/']);
    }
  }

  showSuccess(page, message, status): void {
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
          // this.showSuccess('frmLogin', response['message'], true);
          this.user.isLoggedIn = true;
          this.cookies.set('id', response[1].user_school_id);
          this.cookies.set(response[1].user_school_id, response[3]);
          this.showPage = true;
          this.showSpinner = false;
          // this.router.navigate(['/', 'admin']);
          this.router.navigate(['/', response[1].user_school_id]);
          //   // this.router.navigate(['/', 'admin']);
          } else {
            this.attempt += 1;
            if (this.attempt === 4) {
              this.user.lockout(this.username).subscribe(
                (response) => {
                  if (response) {
                    this.lockout = true;
                    // tslint:disable-next-line:max-line-length
                    this.showSuccess('frmLogin', 'You have been locked-out of your account due multipled failed attempts. Please contact admin @ 09676657853 to reset', false);
                  }
                }
              );
            } else {
              this.showSuccess('frmLogin', response['message'], false);
            }
        }
      }
    );
  }

  forgot_password() {

  }


}

// my commit
