import { Injectable, signal } from '@angular/core';
import { ShoppingCartItem } from '../../data/restaurant/restaurant.model';

interface State {
  totalItems: number;
  shoppingCartItems: ShoppingCartItem[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartStateService {
  private readonly state = signal<State>({
    totalItems: 0,
    shoppingCartItems: [],
    totalPrice: 0,
  });

  setState(state: State): void {
    this.state.set(state);
  }

  getState(): State {
    return this.state();
  }
}
