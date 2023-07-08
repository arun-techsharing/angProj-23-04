import { Component, EventEmitter, Input, Output } from '@angular/core';
import { menu } from '../Model/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() menuItems: menu[] =
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
        itemName: 'Contact',
        urlPath: '/reachme'
      },
      {
        itemName: 'Login',
        urlPath: '/login'
      }
    ]

  userLoginCount: number = 0;
  @Output() userDataChanged: EventEmitter<number> = new EventEmitter();

  loginIncre() {
    this.userLoginCount++;
    console.log(this.userLoginCount)
    this.userDataChanged.emit(this.userLoginCount);
  }

  logOut(){
    localStorage.removeItem('userType');
    localStorage.clear();
  }
}
