import { Cart } from '../../cart/types/Cart';

export type Product = {
  id: number;
  name?: string;
  img?: string;
  brand?: string;
  category?: string;
  sex?: string;
  size?: string;
  price?: number;
  quantity: number;
};
export type quantityOfProduct = Omit<
  Product,
  'name' | 'img' | 'brand' | 'category' | 'sex' | 'size' | 'price'
>;
export type ProductId = Product['id'];
