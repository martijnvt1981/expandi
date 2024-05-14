import { Component, inject } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ShoppingCartItemComponent } from '../shopping-cart-item/shopping-cart-item.component';
import { RestaurantService } from '../../../data/restaurant/restaurant.service';
import { DishComponent } from '../../overview/dishes/dish.component';
import { ShoppingCartItem } from '../../../data/restaurant/restaurant.model';
import { ShoppingCartStateService } from '../../../shared/shopping-cart-state/shopping-cart-state.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  imports: [AsyncPipe, ShoppingCartItemComponent, DishComponent, DecimalPipe],
})
export class ShoppingCartComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas);
  deliveryFee = 3.0;
  shoppingCart$ = this.restaurantService.getShoppingCart();
  totalPrice = this.shoppingCartStateService.getState().totalPrice;

  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly shoppingCartStateService: ShoppingCartStateService
  ) {}

  handleModifyItemClick(shoppingCartItem: ShoppingCartItem): void {
    const matchedId = this.getMatchingId(shoppingCartItem);
    if (!matchedId) return;
    shoppingCartItem.quantity
      ? this.restaurantService
          .putShoppingCartItem(shoppingCartItem, matchedId)
          .subscribe(() => {
            this.totalPrice =
              this.shoppingCartStateService.getState().totalPrice;
            this.shoppingCart$ = this.restaurantService.getShoppingCart();
          })
      : this.restaurantService
          .deleteShoppingCartItem(matchedId)
          .subscribe(() => {
            this.totalPrice =
              this.shoppingCartStateService.getState().totalPrice;
            this.shoppingCart$ = this.restaurantService.getShoppingCart();
          });
  }

  getMatchingId(ShoppingCartItem: ShoppingCartItem): string | undefined {
    return this.shoppingCartStateService
      .getState()
      .shoppingCartItems.find((dish) => dish.dishId === ShoppingCartItem.dishId)
      ?.id;
  }
}
