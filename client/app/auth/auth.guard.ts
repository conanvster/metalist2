import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticationService.getUser()
      .map(res => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
}
