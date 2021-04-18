import { User } from './../../../../../models/users/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'xeron-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss', '../../../panel.component.scss']
})
export class TableComponent implements OnInit {
  @Input() users: Array<User>;
  public users_filter: Array<User>;
  public itemsPerPage = 10;
  public currentPage = 1;
  public keys: Array<string>;


  constructor() {
    this.keys = ['nombre', 'email', 'role'];
  }

  ngOnInit(): void {
    this.users_filter = [...this.users];
  }

  resetFilter() {
    this.users_filter = [...this.users];
  }

  insertElement(user: User): void {
    this.users = [user, ...this.users];
    this.resetFilter();
  }

  updateElement(user: User): void {
    this.users.splice(this.users.indexOf(this.users.find((element) => element.id === user.id)), 1, user);
    this.resetFilter();
  }

  deleteElement(user: User): void {
    this.users.splice(this.users.indexOf(user), 1); // eliminar usuario
    if (this.users.length / this.itemsPerPage < this.currentPage) {
      this.currentPage--;
    }
    this.resetFilter();
  }

}
