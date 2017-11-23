import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import {AuthService} from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthService) { }

  canActivate() {

    console.log('canActivate isLoggedIn 0');

    return true;
  //
  //   if (localStorage.getItem('currentUser')) {
  //     // logged in so return true
  //     return true;
  //   }
  //
  //   // not logged in so redirect to login page
  //   this.router.navigate(['/login']);
  //   return false;
  }
}