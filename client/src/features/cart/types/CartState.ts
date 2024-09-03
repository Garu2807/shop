import { Product } from '../../products/types/Product';
import { Cart } from './Cart';

export type CartState = {
  cart: Product[];
  totalQuantity: number; // Добавляем это свойство
  error: string | undefined;
};
