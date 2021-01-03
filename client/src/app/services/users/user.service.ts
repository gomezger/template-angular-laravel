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

	public login(email: string, password: string): Observable<any> {
		let data = {
			email: email,
			password: password,
			remember_me: true
		};
		return this._api.post('auth/login', data, null);
	}

	public logout() {
		this.deleteLoginData();
	}

	public registro(nombre: string, apellido: string, email: string, password: string, password_confirmation: string, tipo: string): Observable<any> {
		const data = {
			email: email,
			nombre: nombre,
			apellido: apellido,
			password: password,
			password_confirmation: password_confirmation,
			tipo: tipo
		};
		return this._api.post('auth/signup', data, null);
	}

	public delete(email: string, token: string): Observable<any> {
		const data = {
			email: email
		}
		return this._api.post('auth/delete', data, token);
	}

	public setLoginData(data: any): void {
		this._localStorage.setItem('token', data.access_token);
		this._localStorage.setItem('expires_at', data.expires_at);
		this._localStorage.setItem('user', JSON.stringify(data.user));
		this._localStorage.setItem('isLoggedin', 'true');
	}

	private deleteLoginData(): void {
		this._localStorage.removeItem('token');
		this._localStorage.removeItem('expires_at');
		this._localStorage.removeItem('user');
		this._localStorage.setItem('isLoggedin', 'false');
	}

	// Chequea si está el token de un user logeado o no
	public isUserAuthenticated(): boolean {
		const token = localStorage.getItem('token');
    return (token != null && token != undefined) ? this.isValidToken() : false;
	}

	public isAuthenticatedAdmin(): boolean {
		return this.isAuthenticated() && this.isAdmin();
	}

	public isAuthenticated(): boolean {
		const token = localStorage.getItem('token');
		return token !== undefined && token !== null && this.isValidToken();
	}

	private isValidToken(): boolean {
		const expires_at = new Date(formatDate(localStorage.getItem('expires_at'), 'yyyy/MM/dd H:m:s', 'en'));
		const now = new Date(formatDate(new Date(), 'yyyy/MM/dd H:m:s', 'en'));
    return (+expires_at < +now) ? false : true;
	}

	private isAdmin(){
		const user = JSON.parse(localStorage.getItem('user'));
		return user.tipo === 'admin';
	}

	public user(): User{
		return (this.isUserAuthenticated()) ? JSON.parse(localStorage.getItem('user')) : null;
	}

	public dummyUser(): User{
		return new User(0,'','','','','','','');
	}

	public getToken() {
		const token = localStorage.getItem('token');
    return (token !== 'undefined') ? token : null;
	}

	getUsuario(id: number, token: string): Observable<any> {
		return this._api.get('user/' + id, token);
	}

}
