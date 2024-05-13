import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BasketItem, Dish } from './restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private readonly httpClient: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`http://localhost:3000/dishes`);
  }

  getDish(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>(`http://localhost:3000/dishes/${id}`);
  }

  getBasket(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(`http://localhost:3000/basket`);
  }

  postBasket(body: BasketItem): Observable<BasketItem> {
    return this.httpClient.post<BasketItem>(
      `http://localhost:3000/basket`,
      body
    );
  }
}