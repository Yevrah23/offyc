import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServices } from '../services/user_services';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material';
import { ProfileSettingsComponent } from '../modal/profile-settings/profile-settings.component';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  read = [];
  unread = [];
  notif_count: any;


  isAdmin : boolean = false;
  isUser : boolean = false;
  token: any;
  hasNotif : boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // tslint:disable-next-line:max-line-length
  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private cookies: CookieService,
    private router: Router,
    private user: UserServices
  ) { }

  showSettings(): void {
    const dialogRef = this.dialog.open(ProfileSettingsComponent, {
      width: '800px',
      panelClass: 'custom-dialog-porfileSettings'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    this.read = [];
    this.unread = [];

    this.token = this.cookies.get(this.cookies.get('id'));
    if (this.user.isLoggedIn) {
      this.user.check_login(this.token).subscribe(
        (response) => {
          console.log(response[0]);
          if (response[0]) {
            this.user.isLoggedIn = true;
            if (response[1][0] == 1) {
              this.user.admin = true
              this.isAdmin = true;
            } else {
              this.user.user = true
              this.isUser = true;
            }
          } else {
            this.router.navigate(['/']);
            console.log('You Sneaky Bastard');
          }
        }
      );
    } else {
      this.router.navigate(['/']);
      console.log('You Sneaky Bastard');
    }

    this.user.getNotifs(this.cookies.get('id')).subscribe(
      (response) => {
        if (response[0]) {
          response[1].forEach(element => {
            if (element.notif_type_id === 1) {
              element.notif_type_id = 'sent an Extension Project Proposal';
            } else if (element.notif_type_id === 2) {
              element.notif_type_id = 'Your proposal for an Extension Project has been approved';
            } else if (element.notif_type_id === 3) {
              element.notif_type_id = 'Your proposal for an Extension Project is requested to be revised';
            } 
            else if (element.notif_type_id === 4) {
              element.notif_type_id = 'sent a revision for an earlier Extension Project Proposal';
            }else if (element.notif_type_id === 5) {
              element.notif_type_id = 'sent an Accomplishment Report';
            }
          });
          this.user.notifs = response[1];
          this.user.notifs.forEach(element => {
            if (element.notification_status === 1) {
              this.read.push(element);
            } else {
              this.unread.push(element);
            }

          });
        }

        if (this.unread.length > 0){
          this.hasNotif = true;
          $(".notif-icon").addClass("unread");
          this.notif_count = this.unread.length;
        }
      }
    );
  }

  unblink() {
    $('.notif-icon').removeClass('unread');
  }

  // check_notifs() {
  //   this.read = [];
  //   this.unread = [];

  //   this.user.getNotifs(this.cookies.get('id')).subscribe(
  //     (response) => {
  //       if (response[0]) {
  //         this.user.notifs = response[1];
  //         this.user.notifs.forEach(element => {
  //           if (element.notification_status === 1) {
  //             this.read.push(element);
  //           } else {
  //             this.unread.push(element);
  //           }
  //         });
  //         this.notif_count = this.unread.length;
  //       }
  //     }
  //   );
  // }

  logout() {
    this.cookies.deleteAll('/', 'localhost');
    this.user.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
