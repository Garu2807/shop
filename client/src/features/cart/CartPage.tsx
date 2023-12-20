import React, { useContext, useState } from 'react';
import ProductItem from '../products/ProductItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function CartPage(): JSX.Element {
  const { cart } = useSelector((store: RootState) => store.user);

  return (
    <div>
      {cart.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}
export default CartPage;
