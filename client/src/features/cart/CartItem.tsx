// CartItem.tsx

import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { removeFromCart, updateCartQuantity } from './cartSlice';
import './style.css';
import { Product } from '../products/types/Product';
import { Cart } from './types/Cart';

export type CartProps = {
  product: Product;
};

function CartItem({ product }: CartProps): JSX.Element {
  const [quantity, setQuantity] = useState(product.quantity);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (): void => {
    dispatch(removeFromCart(product.id));
  };
  const handleQuantityChange = (newQuantity: number): void => {
    // Обновление локального состояния
    setQuantity(newQuantity);
    // Отправка нового количества в хранилище
    dispatch(
      updateCartQuantity({
        id: product.id,
        quantity: newQuantity,
        name: '',
        img: '',
        brand: '',
        category: '',
        sex: '',
        size: '',
        price: 0,
      })
    );
  };

  return (
    <div className="cart_item">
      <img src={product.img} alt={product.name} />
      <h4>{product.name}</h4>
      <h4>{product.brand}</h4>
      <h4>{product.size}</h4>
      <h4>{product.price}</h4>
      <div className="quantity_controls">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
        />
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
      </div>

      <form className="quantity_controls"></form>
      <button className="removeFromCart" onClick={handleRemoveFromCart}>
        Удалить из корзины
      </button>
    </div>
  );
}

export default CartItem;
