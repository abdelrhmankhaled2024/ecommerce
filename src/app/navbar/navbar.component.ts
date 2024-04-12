import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartNumber:number=0
  isLogin: boolean = false;
  userName: any = '';
  constructor(private _AuthService: AuthService,private _CartService:CartService) {
    _AuthService.userData.subscribe({
      next: () => {
        if (_AuthService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
    _CartService.numberOfCartItems.subscribe(
      {
        next:(data)=>this.cartNumber=data

      }
    )
  }
  logOut() {
    this._AuthService.logOut();
  }
}
