import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './layout/users/users.component';
import { AdminGuard } from '../../guards/admin.guard';
import { FormsModule } from '@angular/forms';
import { SmallLoadingComponent } from './components/loading/small-loading/small-loading.component';


@NgModule({
  declarations: [
    PanelComponent, 
    LoginComponent, UsersComponent, SmallLoadingComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    FormsModule
  ],
	providers: [ AdminGuard ]
})
export class PanelModule { }
