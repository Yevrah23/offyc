import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServices } from '../services/user_services';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  notifs = [];
  read = [];
  unread = [];
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private cookies: CookieService, private router: Router, private user: UserServices) {}
  
  ngOnInit(){
    this.user.getNotifs(this.cookies.get('id')).subscribe(
      (response) => {
        console.log(response);        
      }
    )
  }

  check_notifs(){
    this.user.getNotifs(this.cookies.get('id')).subscribe(
      (response) => {
        console.log(response);      }
    )
  }

  logout() {
    console.log('hello');
    this.cookies.deleteAll();
    this.router.navigate(['/']);
  }

}
