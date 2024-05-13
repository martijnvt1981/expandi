import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DishComponent } from './dishes/dish.component';
import { NavComponent } from './nav/nav.component';
import { RestaurantService } from './data/restaurant/restaurant.service';
import { AsyncPipe } from '@angular/common';
import { BasketItem } from './data/restaurant/restaurant.model';
import { BannerComponent } from './banner/banner.component';
import { BasketShortcutComponent } from './basket-shortcut/basket-shortcut.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    DishComponent,
    NavComponent,
    AsyncPipe,
    BannerComponent,
    BasketShortcutComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  dishes$ = this.restaurantService.getDishes();
  totalItems = 0;
  basketContents: BasketItem[] = [];
  constructor(private readonly restaurantService: RestaurantService) {}

  handleAddItemClick(basketItem: BasketItem): void {
    this.restaurantService.postBasketItem(basketItem).subscribe((data) => {
      this.setBasketState(data);
    });
  }

  handleModifyItemClick(basketItem: BasketItem): void {
    const matchedId = this.basketContents.find(
      (dish) => dish.dishId === basketItem.dishId
    )?.id;
    if (!matchedId) return;
    basketItem.quantity
      ? this.restaurantService
          .putBasketItem(basketItem, matchedId)
          .subscribe((data) => {
            this.setBasketState(data);
          })
      : this.restaurantService.deleteBasketItem(matchedId).subscribe((data) => {
          this.setBasketState(data);
        });
  }

  setBasketState(data: BasketItem[]): void {
    this.basketContents = data;
    this.totalItems = this.basketContents.reduce(
      (accumulator, { quantity }) => accumulator + quantity,
      0
    );
  }
}
