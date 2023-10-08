import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import ProductItem from './ProductItem';
import { loadProducts } from './ProductSlice';
import React from 'react';
import './style.css';
function ProductList(): JSX.Element {
  const { products } = useSelector((store: RootState) => store.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProducts());
  }, []);
  return (
    <div className="product_list">
      {products &&
        products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
    </div>
  );
}

export default ProductList;
