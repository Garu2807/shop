import { Product } from './types/Product';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import './style.css';
import { addToCart } from '../user/userSlice';
type ProductProps = {
  product: Product;
};

function ProductItem({ product }: ProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: Product): void => {
    dispatch(addToCart(product));
  };
  return (
    <div key={product.id} className="product_card">
      <img src={product.img} />
      <h4>{product.name}</h4>
      <h4>{product.brand}</h4>
      <h4>{product.size}</h4>
      <h4>{product.price}</h4>
      <button className="addToCart" onClick={() => handleAddToCart(product)}>
        Добавить в корзину
      </button>
    </div>
  );
}

export default ProductItem;
