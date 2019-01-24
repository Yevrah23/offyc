import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isAdmin = true;
  token: any;
  hasNotif = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private cookies: CookieService, private router: Router) { }



  ngOnInit() {
    this.token = this.cookies.get('set');
    if (this.token === '2') {
      this.isAdmin = false;
    } else {
    }
  }

  logout() {
    console.log('hello');
    this.cookies.deleteAll();
    this.router.navigate(['/']);
  }

}
