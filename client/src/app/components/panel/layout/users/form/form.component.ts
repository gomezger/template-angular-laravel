import { UserService } from './../../../../../services/users/user.service';
import { User } from './../../../../../models/users/user';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import Status from './../../../../../helpers/status';

@Component({
  selector: 'xeron-form-user',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() user: User;
  @Input() title: string;
  @Output() updateTable: EventEmitter<User> = new EventEmitter();
  @ViewChild('closebutton', { static: false }) closebutton: ElementRef;
  public myUser: User;
  public status: Status;

  constructor(
    protected _user: UserService
  ) {
    this.status = new Status();
  }

  ngOnInit(): void {
    this.myUser = (this.user === undefined) ? this._user.dummy() : { ...this.user };
  }

  confirmar = (): void => {
    (this.myUser.id === 0) ? this.insert() : this.update();
  }

  private insert(): void {
    this.status.setLoading();
    const token = this._user.getToken();
    this._user.insert(this.myUser, token).subscribe({
      next: user => {
        this.closebutton.nativeElement.click();
        this.user = this._user.dummy();
        this.myUser = this._user.dummy();
        this.updateTable.emit(user);
      },
      complete: () => this.status.setSuccess(),
      error: error => this.status.processError(error)
    });
  }

  private update(): void  {
    this.status.setLoading();
    const token = this._user.getToken();
    this._user.update(this.myUser, token).subscribe({
      next: user => {
        this.closebutton.nativeElement.click();
        this.user = user;
        this.myUser = { ...this.user };
        this.updateTable.emit(this.user);
      },
      complete: () => this.status.setSuccess(),
      error: error => this.status.processError(error)
    });
  }
}
