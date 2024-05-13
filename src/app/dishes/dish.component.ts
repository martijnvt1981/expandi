import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
} from '@angular/core';
import { BasketItem, Dish } from '../data/restaurant/restaurant.model';

@Component({
  selector: 'app-dish',
  standalone: true,
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishComponent {
  @Input() contents?: Dish;

  addItemClick = output<BasketItem>();

  handleAddToCartButton({ quantity, dishId, dishPrice }: BasketItem): void {
    this.addItemClick.emit({
      quantity,
      dishId,
      dishPrice,
    });
  }
}
