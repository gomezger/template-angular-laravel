import { UsersComponent } from './layout/users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:popup', component: LoginComponent },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'usuarios', children: [
          { path: '', component: UsersComponent }
        ]
      },
    ],
    canActivateChild: [AdminGuard],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
