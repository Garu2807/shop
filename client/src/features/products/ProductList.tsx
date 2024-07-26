import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductItem from './ProductItem';
import { Container } from './Product.styles';
function ProductList(): JSX.Element {
  const { products } = useSelector((store: RootState) => store.products);
  return (
    <Container>
      {products &&
        products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
    </Container>
  );
}

export default ProductList;
