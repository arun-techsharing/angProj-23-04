import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ContactusComponent } from './contactus/contactus.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { customAuthGuard } from './custom-auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductstoreComponent } from './productstore/productstore.component';

const routList: Routes = [
  
  {
    path: 'product',
    component: ProductComponent,
    canActivate:[customAuthGuard]
  },
  {
    path: 'reachme',
    component: ContactusComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'popular-product',
    component: ProductComponent,
    canActivate:[customAuthGuard]
  },
  {
    path: 'product/product-details/:pid',
    component: ProductDetailComponent
  },
  {
    path: 'product/edit-product/:pid',
    component: EditProductComponent,
    canActivate:[customAuthGuard]
  },
  {
    path:'add-product',
    component:AddProductComponent,
    canActivate:[customAuthGuard]
  },
  {
    path:'store-product',
    component:ProductstoreComponent,
    canActivate:[customAuthGuard]
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'admin',
    loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routList)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
