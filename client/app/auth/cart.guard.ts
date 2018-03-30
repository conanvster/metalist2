import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(public auth: AuthService, public cartService: CartService, public router: Router, private _cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.cartService.getCart().toPromise()
      .then((response) => !!response)
      .catch(() => this.cartService.createCart().toPromise())
  }
}
