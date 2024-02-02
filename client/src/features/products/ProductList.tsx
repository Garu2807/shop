import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductItem from './ProductItem';
import './style.css';
function ProductList(): JSX.Element {
  const { products } = useSelector((store: RootState) => store.products);
  return (
    <div className="product_list">
      {products &&
        products.map((product) => (
          <ProductItem product={product}  key={product.id} />
        ))}
    </div>
  );
}

export default ProductList;
