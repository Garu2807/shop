import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import ProductItem from './ProductItem';
import { loadProducts } from './ProductSlice';
import React from 'react';

function ProductList(): JSX.Element {
  const { products } = useSelector((store: RootState) => store.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProducts());
  }, []);
  return (
    <div>
      {products &&
        products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
    </div>
  );
}

export default ProductList;
