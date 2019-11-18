import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Restaurant } from './restaurant/restaurant.model';
import { MEAT_API } from '../app.api';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';
import { LoginService } from '../security/login/login.service';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient, private loginService: LoginService) {}

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams;
    if (search) {
      params = new HttpParams().append('q', search);
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurant`, {params});
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurant/${id}`);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurant/reviews/${id}`);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurant/menus/${id}`);
  }
}
