import { Component, OnInit } from '@angular/core';
import { StatusComponent } from '../../../extends/status/status.component';
import { User } from 'src/app/models/users/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends StatusComponent implements OnInit {
	public usuario: User;
	public identity: User;
	public token: string;

  constructor(
		private _route: Router,
		private _router: ActivatedRoute, 
    private _usuario: UserService
  ) { 
    super();
  }

  ngOnInit(): void {
  }

  /**
     * Inicia sesion con los datos cargados.
     * Utiliza los datos que se guardaron el la variable usuario.
     * Si es exitoso, guarda en el local storage el objeto usuario y el token.
     */
	async handleSubmit(e){
		// evito que recargue pantalla el submit
		e.preventDefault();	
		this.setLoading(true);	
	
		//get datos
		const email = e.target['email'].value;
		const password = e.target['password'].value;
		//le paso el usuario que solo tiene la contraseña y el usuario
		const data = await this._usuario.login(email, password).toPromise();
		
		if ( this.validateResponse(data) ) {
			this._usuario.setLoginData(data);
			this._route.navigate([ '/panel' ]);
		}

	}

}
