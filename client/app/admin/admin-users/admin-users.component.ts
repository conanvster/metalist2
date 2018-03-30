import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {User} from '../../model/user.interface';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: User[];

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  setRole(user, role) {
    if (user.role != role) {
      this.userService.setRole(user.id, role)
        .subscribe(
          () => this.getUsers(),
          err => console.log(err),
        );
    }
  }

}
