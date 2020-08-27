import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';


@NgModule({
  declarations: [
    WebComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule
  ]
})
export class WebModule { }
