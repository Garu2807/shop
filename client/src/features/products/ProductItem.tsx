import { Product } from './types/Product';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import './style.css';
type ProductProps = {
  product: Product;
};
import React from 'react';

function ProductItem({ product }: ProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div key={product.id} className="product_card">
      <img src={product.img} />
      <h4>{product.name}</h4>
      <h4>{product.brand}</h4>
      <h4>{product.size}</h4>
      <h4>{product.price}</h4>
    </div>
  );
}

export default ProductItem;
