import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NotficationService {
  constructor(private _ToastrService: ToastrService) {}
  addToCart() {
    return this._ToastrService.success('This item added into your cart', 'Success',{progressBar:true});
  }
  removeFromCart() {
    return this._ToastrService.warning('This item removed from your cart', 'Success',{progressBar:true});
  }
  updateItem() {
    return this._ToastrService.success('Your item has been updated', 'Success',{progressBar:true});
  }
}
