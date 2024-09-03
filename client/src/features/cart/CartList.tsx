// CartList.tsx

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { getCart } from './cartSlice';
import CartItem, { CartProps } from './CartItem';
import { Container } from './Cart.styles';
function CartList(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  const { cart } = useSelector((store: RootState) => store.cart);
  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [dispatch, user]);

  return (
    <Container>
      {cart && cart.length > 0 ? (
        cart.map((product) => <CartItem key={product.id} product={product} />)
      ) : (
        <p>Корзина пуста</p>
      )}
    </Container>
  );
}

export default CartList;
