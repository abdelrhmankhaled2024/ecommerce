import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: CategoriesComponent,
  },
  { path: 'products', canActivate: [AuthGuard], component: ProductsComponent },
  {
    path: 'productdetails/:id',
    canActivate: [AuthGuard],
    component: ProductdetailsComponent,
  },
  { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
  { path: 'brands', canActivate: [AuthGuard], component: BrandsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
