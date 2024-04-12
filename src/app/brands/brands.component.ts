import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements  OnInit{
  brands: any[]=[]
 
  constructor(private _ProductsService:ProductsService,private _Router:Router){}
 
  ngOnInit(): void {
   this._ProductsService.getBrands().subscribe({
   next: (response) => this.brands= response.data,
   error: (error) => {
    console.log(error);
    this._Router.navigate(['/notfound']);
  },
   

   })
 }
}
