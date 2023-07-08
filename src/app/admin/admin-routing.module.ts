import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path: 'manage-user',
    component: ManageuserComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
