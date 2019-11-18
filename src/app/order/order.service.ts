import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';
import { MEAT_API } from '../app.api';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { LoginService } from '../security/login/login.service';

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService,
              private http: HttpClient,
              private loginService: LoginService) { }

  itemsValue(): number {
    return this.cartService.total();
  }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  totalPrice() {
    return this.cartService.total();
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  clear() {
    this.cartService.clear();
  }

  checkOrder(order: Order): Observable<string> {
    order.telephone = this.loginService.customer.telephone;
    order.email = this.loginService.customer.email;

    return this.http.post<Order>(`${MEAT_API}/order`, order).pipe(map(response => response.id));
  }
}
