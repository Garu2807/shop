// CartItem.tsx

import React from 'react';
import { useAppDispatch } from '../../store';
import { removeFromCart } from './cartSlice';
import './style.css';
import { Product } from '../products/types/Product';
import { Cart } from './types/Cart';

export type CartProps = {
  product: Product;
};

function CartItem({ product }: CartProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (): void => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="cart_item">
      <img src={product.img} alt={product.name} />
      <h4>{product.name}</h4>
      <h4>{product.brand}</h4>
      <h4>{product.size}</h4>
      <h4>{product.price}</h4>
      <div className="quantity_controls"></div>
      <button className="removeFromCart" onClick={handleRemoveFromCart}>
        Удалить из корзины
      </button>
    </div>
  );
}

export default CartItem;
