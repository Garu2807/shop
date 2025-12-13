import React, { JSX, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import ProductItem from './ProductItem';
import styles from './Prooduct.module.scss';

function ProductList(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useSelector((store: RootState) => store.products.products);
  // useEffect(() => {
  //   dispatch(loadProducts());
  // }, []);
  return (
    <div className={styles.container}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductList;
