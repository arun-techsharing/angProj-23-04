import { Component } from '@angular/core';
import { menu } from './Model/menu';

@Component({
  selector: 'index',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angProdApp';
  year = new Date().getFullYear();


  navList: menu[] =
    [
      {
        itemName: 'Home',
        urlPath: '/home'
      },
      {
        itemName: 'Products',
        urlPath: '/product'
      },
      {
        urlPath:'/add-product',
        itemName:'Add Product'

      },
      {
        urlPath:'/store-product',
        itemName:'Product Store'
      },
      {
        itemName: 'Contact',
        urlPath: '/reachme'
      },
      {
        itemName: 'Login',
        urlPath: '/login'
      },
      {
        itemName: 'Register',
        urlPath: '/register'
      },
      {
        itemName: 'Manage User',
        urlPath: '/admin/manage-user'
      },
      {
        itemName: 'Add User',
        urlPath: '/admin/add-user'
      }
    ]

  userCount: number = 0;

  getUpdatedCount() {
    this.userCount = 2;
  }
  
}
