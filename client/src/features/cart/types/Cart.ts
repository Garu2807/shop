import { Product } from '../../products/types/Product';
import { User } from '../../user/types/user';

export type Cart = {
  id: number;
  users_id: User['id'];
  products_id: Product['id'];
  quantity: number;
};
export type CartProduct = {
  id: number;
  users_id: User['id'];
  products_id: Product['id'];
  quantity: number;
  name: string;
  img: string;
  brand: string;
  category: string;
  sex: string;
  size: string;
  price: number;
}
export type CartId = Cart['id'];
// types.ts
