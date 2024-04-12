import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  category: any[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next: (data) => {
        this.category = data.data;
      },
      error: (error) => {
        console.log(error);
        this._Router.navigate(['/notfound']);
      },
    });
  }
}
