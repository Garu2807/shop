import ProductItem from '../products/ProductItem';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { getCarts } from './cartSlice';
import CartItem from './CartItem';

function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  useEffect(() => {
    if (user) {
      dispatch(getCarts());
    }
  }, [user]);
  const { cart } = useSelector((store: RootState) => store.cart);
  return (
    <div>
      {cart &&
        cart.map((product) => <CartItem product={product} key={product.id} />)}
    </div>
  );
}
export default CartPage;
