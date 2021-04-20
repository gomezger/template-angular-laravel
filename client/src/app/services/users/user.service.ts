import { LocalService } from './../storage/local.service';
import { Injectable } from '@angular/core';
import { User } from '../../models/users/user';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public identity: User;
  public token: string;

  constructor(
    private _api: ApiService,
    private _localStorage: LocalService
  ) { }

  login(email: string, password: string): Observable<any> {
    const data = {
      email,
      password,
      remember_me: true
    };
    return this._api.post('auth/login', data, null);
  }

  logout(): void {
    this.deleteLoginData();
  }

  signUp(nombre: string, apellido: string, email: string, password: string, password_confirmation: string, tipo: string)
    : Observable<any> {

    const data = { email, nombre, apellido, password, password_confirmation, tipo };
    return this._api.post('auth/signup', data, null);
  }

  // Chequea si está el token de un user logeado o no
  public isUserAuthenticated(): boolean {
    const token = this._localStorage.getItem('token');
    return (token != null && token !== undefined) ? this.isValidToken() : false;
  }

  setLoginData(data: any): void {
    const { access_token, expires_time, expires_at, user } = data;
    this._localStorage.setItem('token', access_token, expires_time);
    this._localStorage.setItem('expires_at', expires_at, expires_time);
    this._localStorage.setItem('user', JSON.stringify(user), expires_time);
    this._localStorage.setItem('isLoggedin', 'true', expires_time);
  }

  private deleteLoginData(): void {
    this._localStorage.removeItem('token');
    this._localStorage.removeItem('expires_at');
    this._localStorage.removeItem('user');
    this._localStorage.setItem('isLoggedin', 'false');
  }

  isAuthenticatedAdmin(): boolean {
    return this.isAuthenticated() && this.isAdmin();
  }

  isAuthenticated(): boolean {
    const token = this._localStorage.getItem('token');
    if (token !== undefined && token !== null && this.isValidToken()) {
      return true;
    } else {
      this.deleteLoginData();
      return false;
    }
  }

  private isValidToken(): boolean {
    const expiresAt = new Date(formatDate(this._localStorage.getItem('expires_at'), 'yyyy/MM/dd H:m:s', 'en'));
    const now = new Date(formatDate(new Date(), 'yyyy/MM/dd H:m:s', 'en'));
    return +expiresAt >= +now;
  }

  private isAdmin(): boolean {
    const user = JSON.parse(this._localStorage.getItem('user'));
    return user.role === 'admin';
  }

  user(): User {
    return (this.isUserAuthenticated()) ? JSON.parse(this._localStorage.getItem('user')) : null;
  }

  getToken(): string {
    const token = this._localStorage.getItem('token');
    return (token !== undefined) ? token : null;
  }

  dummy(): User {
    return new User(0, '', '', '', '', '', '', '');
  }

  all(token: string): Observable<any> {
    return this._api.get('user/', token);
  }

  insert(user: User, token: string): Observable<any> {
    return this._api.post('user/', user, token);
  }

  update({ id, nombre, email, password, role }: User, token: string): Observable<any> {
    const data = { id, nombre, email, role };
    if (password && password.length > 0) {
      data[password = 'password'] = password;
    }
    return this._api.put('user/', data, token);
  }

  delete(email: string, token: string): Observable<any> {
    return this._api.del('user/' + email, token);
  }



}
