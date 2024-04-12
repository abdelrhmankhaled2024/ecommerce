import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NotficationService } from '../services/notfication.service';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
cartDetails:any=null
  constructor(private _CartService:CartService,private _NotficationService:NotficationService, private  _ProductsService: ProductsService,){}

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe(
      {
        next: (response) => { this.cartDetails = response.data
         },
        error(err) {
          console.log(err)
        },
      }
    )
  }
  removeItemFromCart(productId: string){
    this._CartService.deleteCartItem(productId).subscribe({
      next:(response)=>{
        this.cartDetails=response.data
        this._NotficationService.removeFromCart()
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
      },
      error(err) {
        console.log(err)
      },
    })
  }
  updateItemCount(productId: string,count:number){
    this._CartService.updateItemCount(productId,count).subscribe({
      next:(response)=>{
        this.cartDetails=response.data
        this._NotficationService.updateItem()
      },
      error(err) {
        console.log(err)
      },
    })
  }
}
