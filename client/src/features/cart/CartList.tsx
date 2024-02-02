import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { getCarts } from './cartSlice';
import CartItem from './CartItem';
import './style.css';
function CartList(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(getCarts());
    }
  }, [dispatch, user]);

  const { cart } = useSelector((store: RootState) => store.cart);

  return (
    <div className="cart_list">
      {cart &&
        cart.map((product) => <CartItem product={product} key={product.id} />)}
    </div>
  );
}

export default CartList;
