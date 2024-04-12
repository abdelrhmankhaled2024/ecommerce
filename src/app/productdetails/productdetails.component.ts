import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import { NotficationService } from '../services/notfication.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css',
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService:CartService,
    private _NotficationService:NotficationService
  ) {}
  productId: any;
  productDetails: any;
  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
    this._ProductsService.getProductsDetails(this.productId).subscribe({
      next: (data) => {
        this.productDetails = data.data;
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
  //Slider
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
}
