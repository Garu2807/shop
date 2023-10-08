import { Product, ProductId } from './types/Product';
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('api/products');
  const data = await response.json();
  return data.products;
};
