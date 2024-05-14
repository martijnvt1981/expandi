import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartShortcutComponent } from './shopping-cart-shortcut.component';

describe('BasketShortcutComponent', () => {
  let component: ShoppingCartShortcutComponent;
  let fixture: ComponentFixture<ShoppingCartShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartShortcutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
