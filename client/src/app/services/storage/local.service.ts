import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService extends StorageService {

  constructor() {
    super();
    this.storage = localStorage;
  }

}
