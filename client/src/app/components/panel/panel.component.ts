import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
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
  
	toggle() {
		$('#wrapper').toggleClass('toggled');
  }
  
	logout() {
		this._usuario.logout();
		this._router.navigate([ '/panel/login' ], { relativeTo: this._route });
	}

}
