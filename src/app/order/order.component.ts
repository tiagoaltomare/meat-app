import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;
  delivery = 8;
  orderForm: FormGroup;
  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON'},
    { label: 'Cartão de Débito', value: 'DEB'},
    { label: 'Cartão Refeição', value: 'REF'}
  ];

  orderId: string;

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true};
    }

    return undefined;
  }

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]),
      emailConfirmation: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]),
      address: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      number: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(this.numberPattern)
      ]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [
        Validators.required
      ])
    },
    {
      validators: [OrderComponent.equalsTo],
      updateOn: 'blur'
    });
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems() {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

  checkOrder(order: Order) {
    order.orderItem = this.cartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id, this.orderService.totalPrice())
    );

    this.orderService.checkOrder(order)
    .pipe(tap((orderId: string) => {
      this.orderId = orderId;
    }))
    .subscribe((orderId: string) => {
      this.router.navigate(['/order-summary']);
      console.log(`Compra conluída: ${orderId}`);
      this.orderService.clear();
    });
  }
}
