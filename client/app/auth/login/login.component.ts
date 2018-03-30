import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

import {User} from '../../model/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  user: User;
  error: string;

  form = new FormGroup({
    login: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    })
  });

  constructor(private router: Router, private authenticationService: AuthService) {
  }

  login(formValue) {
    const {email, password} = formValue;
    if (!email || !password) {
      return;
    }
    this.authenticationService.login(email, password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
          this.authenticationService.getUser().subscribe();
        } else {
          this.error = 'fail';
        }
      }, ({error: {message}}) => {
        this.error = message;
      });
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

}
