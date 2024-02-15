import {
  Product,
  ProductId,
  quantityOfProduct,
} from '../products/types/Product';
import { userId } from '../user/types/user';
import { Cart, CartId } from './types/Cart';
// import { userId } from '../user/types/user';

export const getCarts = async (): Promise<Product[]> => {
  const response = await fetch('api/cart');
  const data = await response.json();
  // console.log(data);
  return data;
};

export const addToCart = async (product: Product): Promise<Product> => {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return res.json();
};
export const removeFromCart = async (id: ProductId): Promise<void> => {
  try {
    const response = await fetch(`/api/cart/${id}`, {
      method: 'DELETE',
      credentials: 'include', // Включите передачу куки с запросом
    });
    console.log(response);
    if (response.ok) {
      const result = await response.json();
      return result;
      // Дополнительная логика после успешного удаления
    } else {
      console.error(`Ошибка удаления товара из корзины: ${response.status}`);
      // Обработка ошибки удаления
    }
  } catch (error) {
    console.error('Произошла ошибка при удалении товара из корзины:', error);
    // Обработка других ошибок
  }
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateCartQuantity = async (
  updatedCart: quantityOfProduct
): Promise<quantityOfProduct> => {
  try {
    const res = await fetch(`/api/cart/${updatedCart.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedCart),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
};

// Пример использования: // Замените на реальное значение
