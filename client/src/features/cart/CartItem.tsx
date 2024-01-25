import React from 'react';
import { ProductProps } from '../products/ProductItem';
import { useAppDispatch } from '../../store';
import { Product } from '../products/types/Product';

function CartItem({ product }: ProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  // const handleAddToCart = (product: Product): void => {
  //   dispatch(addToCart(product));
  // };
  return (
    <div key={product.id} className="product_card">
      <img src={product.img} alt="Товар" />
      <h4>{product.name}</h4>
      <h4>{product.brand}</h4> ddd
      <h4>{product.size}</h4>
      <h4>{product.price}</h4>
      {/* <button className="addToCart" onClick={() => handleAddToCart(product)}>
          Добавить в корзину
        </button> */}
    </div>
  );
}

export default CartItem;
