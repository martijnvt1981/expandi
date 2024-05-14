import { Component } from '@angular/core';
import { RestaurantService } from './data/restaurant/restaurant.service';
import { AsyncPipe } from '@angular/common';
import { ShoppingCartItem } from './data/restaurant/restaurant.model';
import { ShoppingCartStateService } from './shared/shopping-cart-state/shopping-cart-state.service';
import { DishComponent } from './domains/overview/dishes/dish.component';
import { BannerComponent } from './domains/overview/banner/banner.component';
import { ShoppingCartShortcutComponent } from './domains/cart/shopping-cart-shortcut/shopping-cart-shortcut.component';
import { NavComponent } from './domains/overview/nav/nav.component';

@Component({
  standalone: true,
  imports: [
    DishComponent,
    NavComponent,
    AsyncPipe,
    BannerComponent,
    ShoppingCartShortcutComponent,
    BannerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  dishes$ = this.restaurantService.getDishes();
  totalItems = 0;
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly shoppingCartStateService: ShoppingCartStateService
  ) {}

  handleAddItemClick(ShoppingCartItem: ShoppingCartItem): void {
    this.restaurantService
      .postShoppingCartItem(ShoppingCartItem)
      .subscribe(() => {
        this.totalItems = this.shoppingCartStateService.getState().totalItems;
      });
  }

  handleModifyItemClick(ShoppingCartItem: ShoppingCartItem): void {
    const matchedId = this.getMatchingId(ShoppingCartItem);
    if (!matchedId) return;
    ShoppingCartItem.quantity
      ? this.restaurantService
          .putShoppingCartItem(ShoppingCartItem, matchedId)
          .subscribe(() => {
            this.totalItems =
              this.shoppingCartStateService.getState().totalItems;
          })
      : this.restaurantService
          .deleteShoppingCartItem(matchedId)
          .subscribe(() => {
            this.totalItems =
              this.shoppingCartStateService.getState().totalItems;
          });
  }

  getMatchingId(ShoppingCartItem: ShoppingCartItem): string | undefined {
    return this.shoppingCartStateService
      .getState()
      .shoppingCartItems.find((dish) => dish.dishId === ShoppingCartItem.dishId)
      ?.id;
  }
}
