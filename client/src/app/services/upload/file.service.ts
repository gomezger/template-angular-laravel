import { Observable } from 'rxjs';
import { ApiService } from '../config/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private _api: ApiService
  ) { }

  upload = (file: File, disk: string, typeFile: string, token: string): Observable<any> => {
    const data = new FormData();
    data.append('file', file);
    data.append('disk', disk);
    data.append('typeFile', typeFile);
    return this._api.postFile('storage/' + typeFile, data, token);
  }

}
