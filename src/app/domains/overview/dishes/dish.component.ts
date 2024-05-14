import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
} from '@angular/core';
import {
  Dish,
  ShoppingCartItem,
} from '../../../data/restaurant/restaurant.model';
import { QuantityComponent } from '../../../shared/quantity/quantity.component';

type Quantity = Pick<ShoppingCartItem, 'quantity'>;

@Component({
  selector: 'app-dish',
  standalone: true,
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuantityComponent],
})
export class DishComponent {
  @Input() contents?: Dish;
  quantity = 0;

  addItemClick = output<ShoppingCartItem>();
  modifyItemClick = output<ShoppingCartItem>();

  handleButtonClick({ quantity }: Quantity): void {
    this.addItemClick.emit({
      quantity,
      ...this.getDishInfo(),
    });
    this.quantity = quantity;
  }

  handleModifyButtonClick({ quantity }: Quantity) {
    this.modifyItemClick.emit({
      quantity,
      ...this.getDishInfo(),
    });
    this.quantity = quantity;
  }

  getDishInfo() {
    return {
      dishName: this.contents?.name,
      dishId: this.contents?.id,
      dishPrice: this.contents?.price,
    } as Omit<ShoppingCartItem, 'quantity'>;
  }
}
