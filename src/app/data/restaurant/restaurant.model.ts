export type Category = 'Burgers' | 'Steaks';

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
  popular: boolean;
}

export interface ShoppingCartItem {
  dishId: string;
  dishPrice: number;
  dishName: string;
  quantity: number;
  id?: string;
}
