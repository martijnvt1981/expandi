import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketShortcutComponent } from './basket-shortcut.component';

describe('BasketShortcutComponent', () => {
  let component: BasketShortcutComponent;
  let fixture: ComponentFixture<BasketShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketShortcutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
