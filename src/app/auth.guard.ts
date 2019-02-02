import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServices } from './services/user_services';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn : boolean = true;
  constructor(private transac: UserServices, private cookies: CookieService) {
    this.isLoggedIn = transac.isLoggedIn;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.isLoggedIn) {
        return true;
      } else {
        if (this.cookies.get('id').length > 0) {
          this.transac.isLoggedIn = true;
          return true;
        } else {
          return false;
        }
      }
  }
}
