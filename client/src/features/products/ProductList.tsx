import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductItem from './ProductItem';
import { Container } from './Product.styles';

function ProductList(): JSX.Element {
  const products = useSelector((store: RootState) => store.products.products);

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
