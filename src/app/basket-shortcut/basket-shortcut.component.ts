import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket-shortcut',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket-shortcut.component.html',
  styleUrl: './basket-shortcut.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketShortcutComponent {
  @Input() totalItems = 0;
}
