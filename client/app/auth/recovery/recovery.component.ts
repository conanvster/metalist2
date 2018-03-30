import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user.interface';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.less']
})
export class RecoveryComponent {
  user: User;
  error = false;
  message: string;

  constructor(private userService: UserService) {
  }

  recover(formValue) {
    this.error = false;
    const {email} = formValue;
    if (!email) {
      return;
    }
    this.userService.recoverPassword(email)
      .subscribe(result => {
        this.message = result.message;
      }, ({error: message}) => {
        console.log('Something went wrong!', message);
        this.message = message.message;
        this.error = true;
      });
  }
}
