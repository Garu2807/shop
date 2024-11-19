import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { removeFromCart, updateCartQuantity } from '../cart/cartSlice';
import { Product } from '../products/types/Product';
import {
  ControlsContainer,
  Item,
  Price,
  ProductDetails,
  QuantityControls,
  RemoveButton,
  Spec,
  // StyledDeleteButton,
} from './Cart.styles';

export type CartProps = {
  product: Product;
};

function CartItem({ product }: CartProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(product.quantity);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const handleRemoveFromCart = (): void => {
    dispatch(removeFromCart(product.id));
  };

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity < 1) return;

    setQuantity(newQuantity);
    dispatch(updateCartQuantity({ id: product.id, quantity: newQuantity }));
  };

  return (
    <Item>
      <img src={product.img} alt={product.name} />
      <Spec>
        <p>{product.name}</p>
        <p>{product.brand}</p>
      </Spec>
      <ProductDetails>
        <Spec>{product.name}</Spec>
        <Price>{`$ ${product.price}`}</Price>
      </ProductDetails>
      <RemoveButton onClick={handleRemoveFromCart}>Удалить</RemoveButton>
      <ControlsContainer>
        <QuantityControls>
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
            min="1"
          />
          <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        </QuantityControls>
      </ControlsContainer>

      {/* <StyledDeleteButton onClick={handleRemoveFromCart} title="Удалить" /> */}
    </Item>
  );
}

export default CartItem;
