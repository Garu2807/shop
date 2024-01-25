import React from 'react';
import { useAppDispatch } from '../../store';
import { Product } from '../products/types/Product';
export type ProductProps = {
  product: Product;
};

function CartItem({ product }: ProductProps): JSX.Element {
  // const dispatch = useAppDispatch();
  // const handleAddToCart = (product: Product): void => {
  //   dispatch(addToCart(product));
  // };
  return (
    <div key={product.id} className="product_card">
      <img src={product.img} />
      <h4>{product.name}</h4>
      <h4>{product.brand}</h4>
      <h4>{product.size}</h4>
      <h4>{product.price}</h4>
      {/* <button className="addToCart" onClick={() => handleAddToCart(product)}>
        Добавить в корзину
      </button> */}
    </div>
  );
}

export default CartItem;