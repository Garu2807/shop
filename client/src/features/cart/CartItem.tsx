import React, { useState, useEffect, JSX } from 'react';
import { useAppDispatch } from '../../store';
import { removeFromCart, updateCartQuantity } from '../cart/cartSlice';
import { Product } from '../products/types/Product';
import styles from './Cart.module.scss';
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
    <div className={styles.item}>
      <img src={product.img} alt={product.name} />
      <p className={styles.spec}>
        <p>{product.name}</p>
        <p>{product.brand}</p>
      </p>
      <div className={styles.productDetails}>
        <p className={styles.spec}>{product.name}</p>
        <p className={styles.price}>{`$ ${product.price}`}</p>
      </div>
      <button className={styles.removeButton} onClick={handleRemoveFromCart}>
        Удалить
      </button>
      <div className={styles.controlsContainer}>
        <div className={styles.quantityControls}>
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
        </div>
      </div>

      {/* <StyledDeleteButton onClick={handleRemoveFromCart} title="Удалить" /> */}
    </div>
  );
}

export default CartItem;
