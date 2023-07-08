import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [
    ManageuserComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
