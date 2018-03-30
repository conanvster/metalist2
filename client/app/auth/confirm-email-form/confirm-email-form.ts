import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'confirm-email-form',
  templateUrl: './confirm-email-form.html',
  styleUrls: ['./confirm-email-form.less']
})

export class ConfirmEmailFormComponent implements OnInit{
  loginMessage: string;
  confirmationMessage: string;
  showSection = false;
  emailValue: string;
  form: FormGroup;
  constructor(private authenticationService: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  handleSubmit() {
    if (this.emailValue) {
      this.login();
    } else {
      this.confirmEmail();
    }
  }
  login() {
    const {email, password} = this.form.value;
    if (!email || !password) {
      return;
    }
    this.confirmationMessage = '';
    this.authenticationService.login(email, password)
      .subscribe(result => {
          if (!result) {
            this.loginMessage = 'fail';
          }
        }, ({error: {message}}) => this.loginMessage = message
      );
  }

  confirmEmail() {
    const {email} = this.form.value;
    if (!email) {
      return;
    }
    this.authenticationService.generateTemporaryPassword(email)
      .subscribe(
        response => {
          this.showSection = true;
          this.confirmationMessage = response.message;
          this.emailValue = email;
        },
        ({error, status}) => {
          this.confirmationMessage = error && error.message;
          this.emailValue = '';
          if (status === 409) {
            this.confirmationMessage = 'alreadyTaken';
          }
        }
      );
  }
  getInputError(field) {
    return this.form.get(field).errors && this.form.get(field).touched ? Object.keys(this.form.get(field).errors) : [];
  }
  handleEmailInput = () => this.confirmationMessage = null;
  handlePasswordInput = () => this.loginMessage = null;
}
