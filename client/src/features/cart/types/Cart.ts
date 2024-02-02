import { Product } from '../../products/types/Product';
import { User } from '../../user/types/user';

export type Cart = {
  id: number;
  users_id: User['id'];
  products_id: Product['id'];
  quantity: number;
};
export type CartId = Cart['id'];
