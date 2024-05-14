import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-shopping-cart-shortcut',
  standalone: true,
  templateUrl: './shopping-cart-shortcut.component.html',
  styleUrl: './shopping-cart-shortcut.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartShortcutComponent {
  @Input() totalItems = 0;

  constructor(private readonly offcanvasService: NgbOffcanvas) {}

  open() {
    const offcanvasRef = this.offcanvasService.open(ShoppingCartComponent, {
      position: 'end',
    });
  }
}
