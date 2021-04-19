import { User } from './../../../../../models/users/user';
import { Table } from './../../../../../helpers/table';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'xeron-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss', '../../../panel.component.scss']
})
export class TableComponent implements OnInit {
  @Input() users: Array<User>;
  public keys: Array<string>;
  public table: Table<User>;

  ngOnInit(): void {
    this.table = new Table(this.users, 10, 1);
    this.keys = ['nombre', 'email', 'role'];
  }

}
