import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService extends StorageService {

  constructor() {
    super();
    this.storage = sessionStorage;
  }

}
