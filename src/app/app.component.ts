import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DishComponent } from './dishes/dish.component';
import { NavComponent } from './nav/nav.component';
import { RestaurantService } from './data/restaurant/restaurant.service';
import { AsyncPipe } from '@angular/common';
import { BasketItem } from './data/restaurant/restaurant.model';

@Component({
  standalone: true,
  imports: [RouterModule, DishComponent, NavComponent, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  dishes$ = this.restaurantService.getDishes();
  constructor(private readonly restaurantService: RestaurantService) {}

  handleAddItemClick(basketItem: BasketItem): void {
    this.restaurantService.postBasket(basketItem).subscribe((data) => {
      this.restaurantService.getBasket().subscribe((data) => {
        console.log('basket content');
      });
    });
  }
}
