import { Cart } from '../../cart/types/Cart';

export type Product = {
  id: number;
  name: string;
  img: string;
  brand: string;
  category: string;
  sex: string;
  size: string;
  price: number;
};
export type ProductId = Product['id'];
