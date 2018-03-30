import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import decode from 'jwt-decode';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private _cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const expectedRole = route.data.expectedRole;
    const token = this._cookieService.get('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      // !this.auth.isAuthenticated() ||
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
