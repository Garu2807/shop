import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import ProductItem from './ProductItem';
import { Container } from './Product.styles';
import { loadProducts } from './ProductSlice';

function ProductList(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useSelector((store: RootState) => store.products.products);
  // useEffect(() => {
  //   dispatch(loadProducts());
  // }, []);
  return (
    <Container>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))
      ) : (
        <p>No products available</p>
      )}
    </Container>
  );
}

export default ProductList;
