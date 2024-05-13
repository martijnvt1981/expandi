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

export interface BasketItem {
  dishId: string;
  dishPrice: number;
  quantity: number;
  id?: string;
}
