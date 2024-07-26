// CartItem.tsx

import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { removeFromCart, updateCartQuantity } from './cartSlice';
import { Product } from '../products/types/Product';
import {
  Item,
  QuantityControls,
  Spec,
  StyledDeleteButton,
} from './Cart.styles';

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
    setQuantity(newQuantity);
    const quantityUpdate: Product = {
      id: product.id,
      quantity: newQuantity,
    };
    dispatch(updateCartQuantity(quantityUpdate));
  };

  return (
    <Item>
      <img src={product.img} alt={product.name} />
      <Spec>
        <p>{product.name}</p>
        <p>{product.brand}</p>
      </Spec>
      {/* <p>{product.size}</p>
        <p>{product.price}</p> */}
      <QuantityControls>
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>

        <input
          value={quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
        />
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        {/* <BsPlusLg onClick={() => handleQuantityChange(quantity + 1)} /> */}
      </QuantityControls>
      <StyledDeleteButton onClick={handleRemoveFromCart} title="Удалить" />
    </Item>
  );
}

export default CartItem;
