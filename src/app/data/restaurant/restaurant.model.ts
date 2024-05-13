export type Category = 'Burgers' | 'Steaks';

export interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
  popular: boolean;
}

export interface BasketItem {
  dishId: number;
  dishPrice: number;
  quantity: number;
}
