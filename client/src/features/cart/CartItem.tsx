// CartItem.tsx

import React, { useState } from 'react';
import { RootState, useAppDispatch } from '../../store';
import { removeFromCart, updateCartQuantity } from './cartSlice';
import './style.css';
import { Product } from '../products/types/Product';
import { Cart } from './types/Cart';
import { IoMdClose } from 'react-icons/io';
import { BsPlusLg } from 'react-icons/bs';
import { CgMathMinus } from 'react-icons/cg';
import { useSelector } from 'react-redux';

export type CartProps = {
  product: Product;
};

function CartItem({ product }: CartProps): JSX.Element {
  const { cart } = useSelector((store: RootState) => store.cart);
  const [quantity, setQuantity] = useState(product.quantity);
  const dispatch = useAppDispatch();
  // const { cart } = useSelectot((store: RootState) => store.cart);
  const handleRemoveFromCart = (): void => {
    dispatch(removeFromCart(product.id));
  };
  const handleQuantityChange = (newQuantity: number): void => {
    //Если кол-во меньше 1 то вызывем диспатч на удаление
    // if (quantity < 1) {
    //   dispatch(removeFromCart(product.id));
    // }
    // Обновление локального состояния
    setQuantity(newQuantity);
    // Отправка нового количества в хранилище
    const quantityUpdate: Product = {
      id: product.id,
      quantity: newQuantity,
    };
    dispatch(updateCartQuantity(quantityUpdate));
  };

  return (
    <div className="cart_item">
      <div className="image_div">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="products_spec">
        <p>{product.name}</p>
        <p>{product.brand}</p>
      </div>
      {/* <p>{product.size}</p>
        <p>{product.price}</p> */}
      <div className="quantity_controls">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        {/* <CgMathMinus
          onClick={() => handleQuantityChange(quantity - 1)}
          // disabled={quantity <= 1}
        /> */}
        <input
          className="quantityCounter"
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
        />
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        {/* <BsPlusLg onClick={() => handleQuantityChange(quantity + 1)} /> */}
      </div>
      <IoMdClose className="removeFromCart" onClick={handleRemoveFromCart} />
    </div>
  );
}

export default CartItem;
