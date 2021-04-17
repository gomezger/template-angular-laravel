import { UserService } from './../../../../services/users/user.service';
import Status from './../../../../helpers/status';
import { User } from './../../../../models/users/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xeron-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../../panel.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<User>;
  public status: Status;


  constructor(
    protected _user: UserService
  ) { }

  ngOnInit(): void {
    this.status = new Status();
    this.getUsers();
  }

  getUsers(): void {
    this.status.setLoading();

    this._user.all(this._user.getToken()).subscribe({
      next: users => this.users = users,
      complete: () => this.status.setSuccess(),
      error: error => this.status.processError(error)
    });
  }

}
