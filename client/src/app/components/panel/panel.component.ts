import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(
    private _usuario: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }


  /**
   * Si la vista tiene menos de 992px, al hacer click en el menu
   * cierra el menu.
   */
  click() {
    const width = document.body.offsetWidth;
    if (width < 992) { this.toggle(); }
  }

  /**
   * Oculta el menu
   */
  toggle() {
    const menuDiv = document.getElementById('wrapper');
    (menuDiv.classList.contains('toggled'))
      ? menuDiv.classList.remove('toggled')
      : menuDiv.classList.add('toggled');
  }

  /**
   * Cierra sesión
   */
  logout() {
    this._usuario.logout();
    this._router.navigate(['/panel/login'], { relativeTo: this._route });
  }

}
