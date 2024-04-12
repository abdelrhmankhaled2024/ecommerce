import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-categoryslider',
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.css'
})
export class CategorysliderComponent  implements OnInit{
  categories:any[] = [];
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next: (response) => this.categories=response.data,
      error: (error) => {console.log(error)},
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1500,

    responsive: {
      0: {
        items: 5
      },
      
      
    },
    nav: false
  }
}
