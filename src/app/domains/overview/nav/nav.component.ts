import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {}
