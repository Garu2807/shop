import { Product } from './types/Product';
import { useAppDispatch } from '../../store';
import './style.css';
import { addToCart } from '../cart/cartSlice';
export type ProductProps = {
  product: Product;
};

function ProductItem({ product }: ProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: Product): void => {
    dispatch(addToCart(product));
  };
  return (
    <div className="product_item">
      <img src={product.img} alt="Товар" />
      <p>{product.brand}</p>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <button className="addToCart" onClick={() => handleAddToCart(product)}>
        Добавить в корзину
      </button>
    </div>
  );
}

export default ProductItem;
