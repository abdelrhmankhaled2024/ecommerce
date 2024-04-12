import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { Products } from './../products';
import { CartService } from '../services/cart.service';
import { NotficationService } from '../services/notfication.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  searchTerm: string = '';
  constructor(
    private _ProductsService: ProductsService,
    private _Router: Router,
    private _CartService: CartService,
    private _NotficationService: NotficationService,
    
  ) {}
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => (this.products = response.data),
      error: (error) => {
        this._Router.navigate(['/notfound']);
      },
    });
  }
  addToCart(productid: string){
    this._CartService.addToCart(productid).subscribe({
      next: (response) => {
        this._NotficationService.addToCart();
        this._CartService.numberOfCartItems.next(response.numOfCartItems);

      },
      error(err) {
        console.log(err)
      },
    });
  }
}
