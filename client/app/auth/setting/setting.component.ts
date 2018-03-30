import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from "../../model/user.interface";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less']
})
export class SettingComponent implements OnInit {
  user: User;
  message: string;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
  }

  changePassword(formValue) {
    const {currentPassword, newPassword} = formValue;
    if (!currentPassword || !newPassword) {
      return;
    }
    this.userService.changePassword(this.authService.user.getValue().id, currentPassword, newPassword)
      .subscribe(
        () => this.message = 'success',
        () => this.message = 'fail'
      );
  }
}
