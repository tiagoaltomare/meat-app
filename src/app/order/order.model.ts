import { Customer } from '../security/login/customer.model';

class Order {
  constructor(
    public address: string,
    // tslint:disable-next-line:variable-name
    public number: number,
    public optionalAddress: string,
    public paymentOption: string,
    public telephone: string,
    public email: string,
    public id?: string,
    public orderItem: OrderItem[] = []
  ) {

  }
}

class OrderItem {
  constructor(
    public quantity: number,
    public menuId: string,
    public price: number
  ) {}
}

export {Order, OrderItem};
