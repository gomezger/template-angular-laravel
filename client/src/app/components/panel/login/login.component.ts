import { Component, OnInit } from '@angular/core';
import Status from '../../../helpers/status';
import { User } from 'src/app/models/users/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'xeron-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public usuario: User;
  public identity: User;
  public token: string;
  public status: Status;

  constructor(
    private _router: Router,
    protected _activatedRoute: ActivatedRoute,
    private _usuario: UserService,
    private _title: Title
  ) { }

  ngOnInit(): void {
    this.status = new Status();
    this._title.setTitle('Ingresar | Panel de Control');
  }

  /**
   * Inicia sesion con los datos cargados.
   * Utiliza los datos que se guardaron el la variable usuario.
   * Si es exitoso, guarda en el local storage el objeto usuario y el token.
   */
  handleSubmit(e: any): void {
    // evito que recargue pantalla el submit
    e.preventDefault();
    this.status.setLoading();

    // get datos
    const { email, password } = e.target;

    this._usuario.login(email.value, password.value).subscribe({
      next: ({ access_token, token_type, expires_at, user }) => {
        this._usuario.setLoginData({ access_token, token_type, expires_at, user });
        this.status.setSuccess();
        this.navigate();
      },
      complete: () => this._router.navigate(['/panel']),
      error: error => this.status.processError(error)
    });
  }

  navigate(): void {
    // obtengo los parametros de la url
    this._activatedRoute.params.subscribe({
      next: ({ popup }) => {
        (popup) ? window.close() : this._router.navigate(['/panel/usuarios']);
      }
    });
  }

}
