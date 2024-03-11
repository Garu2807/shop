import { Product } from './types/Product';
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('api/products');
  const data = await response.json();
  return data.products;
};
export const addProducts = async (product: Product): Promise<Product> => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return res.json();
};
