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
  quantity = 0;

  addItemClick = output<BasketItem>();
  modifyItemClick = output<BasketItem>();

  handleButtonClick({ quantity, dishId, dishPrice }: BasketItem): void {
    this.addItemClick.emit({
      quantity,
      dishId,
      dishPrice,
    });
    this.quantity = quantity;
  }

  handleModifyButtonClick({ quantity, dishId, dishPrice }: BasketItem) {
    this.modifyItemClick.emit({
      quantity,
      dishId,
      dishPrice,
    });
    this.quantity = quantity;
  }
}
