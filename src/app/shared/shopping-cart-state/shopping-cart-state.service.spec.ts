import { TestBed } from '@angular/core/testing';

import { ShoppingCartStateService } from './shopping-cart-state.service';

describe('ShoppingCartStateService', () => {
  let service: ShoppingCartStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
