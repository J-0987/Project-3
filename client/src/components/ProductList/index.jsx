import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category && product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">

<h2>Our Products:</h2>

{state.products.length ? (
  <div className="flex-row">
    {filterProducts().map((product) => (
      <Card className="card" style={{ width: '18rem' }} key={product._id}>
        <Card.Img variant="top" src={product.thumbnail} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.description}
          </Card.Text>
          <Card.Text>
            Price: ${product.price}
          </Card.Text>

          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    ))}
  </div>
) : (
  <h3>You haven't added any products yet!</h3>
)}


</div>
  )

}

export default ProductList;

/*

{state.products.length ? (
  <div className="flex-row">
    {filterProducts().map((product) => (
      <ProductItem
        key={product._id}
        _id={product._id}
        image={product.thumbnail} // Use 'thumbnail' instead of 'image'
        name={product.name}
        description={product.description} // Add 'description'
        price={product.price}
        quantity={product.quantity}
        category={product.category ? product.category.name : ''} // Add 'category'
      />
    ))}
  </div>
) : (
  <h3>You haven't added any products yet!</h3>
)}
{loading ? <img src={spinner} alt="loading" /> : null}

*/