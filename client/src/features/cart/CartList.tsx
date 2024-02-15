// CartList.tsx

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { getCarts } from './cartSlice';
import CartItem, { CartProps } from './CartItem';
import './style.css';

function CartList(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  const { products } = useSelector((store: RootState) => store.products);
  const { cart } = useSelector((store: RootState) => store.cart);
  useEffect(() => {
    if (user) {
      dispatch(getCarts());
    }
  }, [dispatch, user]);

  return (
    <div className="cart_list">
      {cart && cart.length > 0 ? (
        cart.map((product) => <CartItem key={product.id} product={product} />)
      ) : (
        <p>Корзина пуста</p>
      )}
    </div>
  );
}

export default CartList;
