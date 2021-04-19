import { FileService } from '../../../../services/upload/file.service';
import { UserService } from './../../../../services/users/user.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Status from '../../../../helpers/status';

@Component({
  selector: 'xeron-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  public file: File;
  public progress = 0;
  public velocidad = 500;
  @Output() uploadSuccess: EventEmitter<string> = new EventEmitter();
  @Input() disk = 'public';
  @Input() typeFile = 'public';
  public status: Status;

  constructor(
    protected _user: UserService,
    protected _file: FileService
  ) {
    this.status = new Status();
  }

  ngOnInit(): void {
  }

  fileChanged(e): void {
    this.file = e.target.files[0] !== undefined ? e.target.files[0] : undefined;
    this.upload();
  }

  upload(): void {
    this.status.setLoading();
    this.progressBar(0, 90, true);
    const token = this._user.getToken();
    this._file.upload(this.file, this.disk, this.typeFile, token).subscribe(
      (response) => {
        this.status.setSuccess();
        this.uploadSuccess.emit(response);
        this.progressBar(90, 100, false);
      },
      (error) => {
        this.status.processError(error);
        this.file = undefined;
        this.progress = 0;
      }
    );
  }

  // tslint:disable-next-line: typedef
  private async progressBar(begin: number, end: number, loading: boolean): Promise<any> {

    let ms = 10;

    for (let i = begin; i <= end && ((loading && this.status.loading) || (!loading && this.status.success)); i += 2) {
      this.progress = i;
      await this.sleep(ms);
      ms += this.velocidad;
    }


  }

  // tslint:disable-next-line: typedef
  async sleep(ms): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
