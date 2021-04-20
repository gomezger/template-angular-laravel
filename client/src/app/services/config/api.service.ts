import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../helpers/global';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) { }

  // headers para las consultas
  protected getHeaders = (token) => {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'X-Requested-With': 'XMLHttpRequest'
    });
  }

  // headers para las consultas
  protected getHeadersFormData = (token) => {
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  get = (path: string, token: string = undefined): Observable<any> => {
    return this._http.get(GLOBAL.api + path, { headers: this.getHeaders(token) });
  }

  post = (path: string, data: any, token: string = undefined): Observable<any> => {
    return this._http.post(GLOBAL.api + path, JSON.stringify(data), { headers: this.getHeaders(token) });
  }

  put = (path: string, data: any, token: string = undefined): Observable<any> => {
    return this._http.put(GLOBAL.api + path, JSON.stringify(data), { headers: this.getHeaders(token) });
  }

  del = (path: string, token: string = undefined): Observable<any> => {
    return this._http.delete(GLOBAL.api + path, { headers: this.getHeaders(token) });
  }

  postFile = (path: string, data: FormData, token: string = undefined): Observable<any> => {
    return this._http.post(GLOBAL.api + path, data, { headers: this.getHeadersFormData(token) });
  }

}
