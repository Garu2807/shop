import { Product } from '../products/types/Product';

export const getCarts = async (): Promise<Product[]> => {
  const response = await fetch('api/cart');
  const data = await response.json();
  console.log(data);
  return data.Products;
};

export const addToCart = async (product: Product): Promise<Product> => {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  console.log(res);
  return res.json();
};
