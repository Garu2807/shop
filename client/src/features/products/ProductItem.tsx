import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { Product } from '../products/types/Product';
import { addToCart, updateCartQuantity } from '../cart/cartSlice';
import { Item } from './Product.styles';

export type ProductProps = {
  product: Product;
};

function ProductItem({ product }: ProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);

  const handleAddToCart = (product: Product): void => {
    // Проверяем, есть ли уже товар в корзине
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Если товар уже в корзине, увеличиваем его количество
      dispatch(
        updateCartQuantity({
          id: product.id,
          quantity: existingProduct.quantity + 1,
        })
      );
    } else {
      // Если товара нет в корзине, добавляем его с количеством 1
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  return (
    <Item>
      <img src={product.img} alt={product.name} />
      <p>{product.brand}</p>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <button className="addToCart" onClick={() => handleAddToCart(product)}>
        {cart.some((item) => item.id === product.id)
          ? 'Добавить еще'
          : 'Добавить в корзину'}
      </button>
    </Item>
  );
}

export default ProductItem;
