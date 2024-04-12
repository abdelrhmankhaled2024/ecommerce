import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartId: string=''
  constructor(private _CartService:CartService){}
shippingAddress:FormGroup=new FormGroup({
  details:new FormControl(null),
  phone:new FormControl(null),
  city:new FormControl(null),
})
ngOnInit(): void {
  this._CartService.getLoggedUserCart().subscribe(
    {
      next: (response) => { this.cartId=response.data._id
      
       },
      error(err) {
        console.log(err)
      },
    }
  )
}
handleSumbit(shippingAddress:FormGroup){
this._CartService.onlinePayment(this.cartId, shippingAddress.value).subscribe(
  {
    next:(response:any)=>{this.navigateToPage(response.session.url)},
    error:(err)=>console.log(err)
  }
)
}
navigateToPage(url:string){
window.location.href=url
}
}
