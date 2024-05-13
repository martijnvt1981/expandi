import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DishComponent } from './dishes/dish.component';
import { NavComponent } from './nav/nav.component';
import { RestaurantService } from './data/restaurant/restaurant.service';
import { AsyncPipe } from '@angular/common';
import { BasketItem } from './data/restaurant/restaurant.model';
import { BannerComponent } from './banner/banner.component';
import { BasketShortcutComponent } from './basket-shortcut/basket-shortcut.component';
import { switchMap } from 'rxjs';

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
  quantity = 0;
  basketContents: BasketItem[] = [];
  constructor(private readonly restaurantService: RestaurantService) {}

  handleAddItemClick(basketItem: BasketItem): void {
    this.restaurantService
      .postBasketItem(basketItem)
      .pipe(switchMap(() => this.restaurantService.getBasket()))
      .subscribe((data) => {
        this.basketContents = data;
      });
  }

  handleModifyItemClick(basketItem: BasketItem): void {
    const id = this.basketContents.find(
      (dish) => dish.dishId === basketItem.dishId
    )?.id;
    if (!id) return;
    basketItem.quantity
      ? this.restaurantService.putBasketItem(basketItem, id).subscribe()
      : this.restaurantService.deleteBasketItem(id).subscribe();
  }
}
