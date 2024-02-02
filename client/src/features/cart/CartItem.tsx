import React from 'react';
import { useAppDispatch } from '../../store';
import { Product } from '../products/types/Product';
import { Cart } from './types/Cart';
import { removeFromCart } from './cartSlice';
import './style.css';
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
      <button className="removeFromCart" onClick={handleRemoveFromCart}>
        Удалить из корзины
      </button>
    </div>
  );
}

export default CartItem;
