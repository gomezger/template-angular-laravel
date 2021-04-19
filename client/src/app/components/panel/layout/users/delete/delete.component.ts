import { UserService } from './../../../../../services/users/user.service';
import { User } from './../../../../../models/users/user';
import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import Status from './../../../../../helpers/status';

@Component({
  selector: 'xeron-delete-user',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @ViewChild('closebutton', { static: false }) closebutton: ElementRef;
  @Input() user: User;
  @Output() updateTable: EventEmitter<User> = new EventEmitter();
  public status: Status;

  constructor(
    private _user: UserService
  ) {
    this.status = new Status();
  }

  ngOnInit(): void { }

  confirmar($e): void {
    this.status.setLoading();
    const token = this._user.getToken();
    this._user.delete(this.user.email, token).subscribe({
      next: user => this.updateTable.emit(this.user),
      complete: () => this.closebutton.nativeElement.click(),
      error: error => this.status.processError(error)
    });
  }

}
