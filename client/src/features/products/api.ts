import { Product, ProductFormInput, ProductId } from './types/Product';
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('api/products');
  const data = await response.json();
  return data.products;
};
export const addProducts = async (
  newProduct: ProductFormInput
): Promise<Product> => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });
  const data = await res.json();
  console.log(data);
  return data;
};
export const removeProduct = async (id: ProductId): Promise<ProductId> => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });
  // if (!response.ok) {
  //   throw new Error('Failed to delete product');
  // }
  const data = await response.json();
  console.log(data);
  return data;
};
export const updateProduct = async (
  updatedProduct: Product
): Promise<Product> => {
  const res = await fetch(`/api/products/${updatedProduct.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedProduct),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
};
