import React from 'react';
import { useAppDispatch } from '../../store';
import { Product } from '../products/types/Product';
import { removeFromCart } from './cartSlice';
import { User } from '../user/types/user';
export type CartProps = {
  product: Product;
};

function CartItem({ product }: CartProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleRemoveFromCart = (product: Product): void => {
    dispatch(removeFromCart(product.id));
  };
  return (
    <div key={product.id} className="product_card">
      <img src={product.img} />
      <h4>{product.name}</h4>
      <h4>{product.brand}</h4>
      <h4>{product.size}</h4>
      <h4>{product.price}</h4>
      <button
        className="removeFromCart"
        onClick={() => handleRemoveFromCart(product)}
      >
        Удалить из корзины
      </button>
    </div>
  );
}

export default CartItem;
