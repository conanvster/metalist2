import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private _cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data.expectedRole;
    const token = this._cookieService.get('token');
    if (!token) {
      this.router.navigate(['login']);
      return;
    } else {
      const tokenPayload = decode(token);
      if (!expectedRole.includes(tokenPayload.role)) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
  }
}
