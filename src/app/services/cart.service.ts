import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  headers:any={
    token:localStorage.getItem('userToken')
  }
  baseUrl: string = 'https://ecommerce.routemisr.com';
  numberOfCartItems= new BehaviorSubject(0)
  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserCart().subscribe(
      {
        next:(data)=>this.numberOfCartItems.next(data.numOfCartItems),
        error:(err)=>console.log(err)

      }
    )
  }
  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + '/api/v1/cart',
      {productId: productId},
      {headers:this.headers}
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(
      this.baseUrl + '/api/v1/cart',
      
      {headers:this.headers}
    );
  }
  deleteCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(
      this.baseUrl + `/api/v1/cart/${productId}`,
      
      {headers:this.headers}
    );
  }
  updateItemCount(productId: string,count:number): Observable<any> {
    return this._HttpClient.put(
      this.baseUrl + `/api/v1/cart/${productId}`,{count:count}
      ,
      {headers:this.headers}
    );
  }
  onlinePayment(cartId:string,shippingAddress:any) {
    return this._HttpClient.post(
      this.baseUrl + `/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{shippingAddress:shippingAddress}
      ,
      {headers:this.headers}
    );
  }
}
