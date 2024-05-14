import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dish, ShoppingCartItem } from './restaurant.model';
import { ShoppingCartStateService } from '../../shared/shopping-cart-state/shopping-cart-state.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly shoppingCartStateService: ShoppingCartStateService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`http://localhost:3000/dishes`).pipe();
  }

  getShoppingCart(): Observable<ShoppingCartItem[]> {
    return this.httpClient
      .get<ShoppingCartItem[]>(`http://localhost:3000/basket`)
      .pipe(
        tap((data) => {
          this.setShoppingCartState(data);
        })
      );
  }

  postShoppingCartItem(body: ShoppingCartItem): Observable<ShoppingCartItem[]> {
    return this.httpClient
      .post<ShoppingCartItem>(`http://localhost:3000/basket`, body)
      .pipe(
        switchMap(() => this.getShoppingCart()),
        tap((data) => {
          this.setShoppingCartState(data);
        })
      );
  }

  putShoppingCartItem(
    body: ShoppingCartItem,
    id: string
  ): Observable<ShoppingCartItem[]> {
    return this.httpClient
      .put<ShoppingCartItem>(`http://localhost:3000/basket/${id}`, body)
      .pipe(
        switchMap(() => this.getShoppingCart()),
        tap((data) => {
          this.setShoppingCartState(data);
        })
      );
  }

  deleteShoppingCartItem(id: string): Observable<ShoppingCartItem[]> {
    return this.httpClient
      .delete<ShoppingCartItem>(`http://localhost:3000/basket/${id}`)
      .pipe(
        switchMap(() => this.getShoppingCart()),
        tap((data) => {
          this.setShoppingCartState(data);
        })
      );
  }

  private setShoppingCartState(data: ShoppingCartItem[]): void {
    const shoppingCartItems = data;
    const totalItems = shoppingCartItems.reduce(
      (accumulator, { quantity }) => accumulator + quantity,
      0
    );
    const totalPrice = shoppingCartItems.reduce(
      (accumulator, { quantity, dishPrice }) =>
        accumulator + quantity * dishPrice,
      0
    );
    this.shoppingCartStateService.setState({
      shoppingCartItems,
      totalItems,
      totalPrice,
    });
  }
}
