import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantityComponent {
  @Input() quantity = 0;

  decrementButtonClick = output<void>();
  incrementButtonClick = output<void>();

  handleDecrementButtonClick(): void {
    this.decrementButtonClick.emit();
  }

  handleIncrementButtonClick(): void {
    this.incrementButtonClick.emit();
  }
}
