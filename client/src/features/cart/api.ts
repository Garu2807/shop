import { Product, ProductId } from '../products/types/Product';
import { userId } from '../user/types/user';
import { Cart, CartId } from './types/Cart';
// import { userId } from '../user/types/user';

export const getCarts = async (): Promise<Product[]> => {
  const response = await fetch('api/cart');
  const data = await response.json();
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
  return res.json();
};
export const removeFromCart = async (id: ProductId): Promise<void> => {
  try {
    const response = await fetch(`/api/cart/${id}`, {
      method: 'DELETE',
      credentials: 'include', // Включите передачу куки с запросом
    });

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
const updateCartQuantity = async (
  Id: number,
  quantity: number
): Promise<any> => {
  try {
    const response = await fetch(`/api/cart/${Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
};

// Пример использования: // Замените на реальное значение
