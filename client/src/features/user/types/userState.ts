import { Product } from '../../products/types/Product';
import { User } from './user';
type UserState = {
  cart: Product[];
  error: string | undefined;
};
export default UserState;
