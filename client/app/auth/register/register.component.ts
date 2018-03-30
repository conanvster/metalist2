import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  loading = false;
  user: User;
  error: string;

  constructor(private router: Router,
              private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  register(formValue) {
    this.loading = true;
    const {name, email, password, subscribeNews} = formValue;
    if (!name || !email || !password) {
      return;
    }
    this.userService.create(email, name, subscribeNews, password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/login']);
        } else {
          this.error = 'fail';
          this.loading = false;
        }
      }, ({error: {message}}) => {
        console.log('Something went wrong!', message);
        this.error = message;
      });
  }
}
