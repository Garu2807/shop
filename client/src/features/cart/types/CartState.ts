import { Product } from '../../products/types/Product';

export type CartState = {
  cart: Product[];
  quantity: number;
  error: string | undefined;
};
