import { Product } from '../../products/types/Product';

export type CartState = {
  cart: Product[];
  error: string | undefined;
};
