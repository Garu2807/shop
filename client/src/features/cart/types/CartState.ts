import { Product } from '../../products/types/Product';
import { Cart } from './Cart';

export type CartState = {
  cart: Product[];
  quantity: number;
  error: string | undefined;
};
