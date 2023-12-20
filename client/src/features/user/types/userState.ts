import { Product } from '../../products/types/Product';
import { User } from './user';
type UserState = {
  user: User[];
  cart: Product[];
  error: string | undefined;
};
export default UserState;
