import { UserService } from './services/users/user.service';
import { IndexedDBService } from './services/storage/indexed-db.service';
import { LocalService } from './services/storage/local.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor() { }

}
