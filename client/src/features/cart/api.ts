import { Product, ProductId } from '../products/types/Product';

// API-функция для получения корзины
export const getCart = async (): Promise<{
  cart: Product[];
  totalQuantity: number;
}> => {
  const response = await fetch('/api/cart');
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
};

// API-функция для получения общего количества товаров в корзине
export const fetchCartQuantity = async (): Promise<{
  totalQuantity: number;
}> => {
  const response = await fetch('/api/cart/quantity');
  if (!response.ok) {
    throw new Error('Failed to fetch cart quantity');
  }
  return response.json();
};

// API-функция для добавления товара в корзину
export const addToCart = async (product: Product): Promise<{ totalQuantity: number }> => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to add product to cart');
  }

  return response.json();
};


// API-функция для обновления количества товара в корзине
export const updateCartQuantity = async ({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}): Promise<{ totalQuantity: number }> => {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    throw new Error('Failed to update cart quantity');
  }
  return response.json();
};

// API-функция для удаления товара из корзины
export const removeFromCart = async (
  id: ProductId
): Promise<{ totalQuantity: number }> => {
  try {
    const response = await fetch(`/api/cart/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error(`Ошибка удаления товара из корзины: ${response.status}`);
      throw new Error('Failed to remove product from cart');
    }

    const result = await response.json();
    return result; // Предполагается, что сервер возвращает { totalQuantity }
  } catch (error) {
    console.error('Произошла ошибка при удалении товара из корзины:', error);
    throw error;
  }
};
