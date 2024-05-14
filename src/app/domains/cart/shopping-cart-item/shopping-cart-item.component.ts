import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  output,
} from '@angular/core';
import { QuantityComponent } from '../../../shared/quantity/quantity.component';
import { ShoppingCartItem } from '../../../data/restaurant/restaurant.model';

type Quantity = Pick<ShoppingCartItem, 'quantity'>;

@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [QuantityComponent],
  templateUrl: './shopping-cart-item.component.html',
  styleUrl: './shopping-cart-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() contents?: ShoppingCartItem;
  total = 0;
  modifyItemClick = output<ShoppingCartItem>();

  ngOnInit() {
    this.total =
      (this.contents?.dishPrice as number) *
      (this.contents?.quantity as number);
  }

  handleModifyButtonClick({ quantity }: Quantity) {
    this.modifyItemClick.emit({
      quantity,
      ...this.getDishInfo(),
    });
    this.total = (this.contents?.dishPrice as number) * quantity;
  }

  getDishInfo() {
    return {
      dishName: this.contents?.dishName,
      dishId: this.contents?.dishId,
      dishPrice: this.contents?.dishPrice,
    } as Omit<ShoppingCartItem, 'quantity'>;
  }
}
