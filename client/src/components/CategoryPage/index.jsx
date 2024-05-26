import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import ProductItem from '../ProductItem'; // Import ProductItem component

function CategoryPage() {
  const { categoryName } = useParams();
  const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
    variables: { category: categoryName },
  });

  const [state, dispatch] = useStoreContext(); // Retrieve cart and dispatch from the global state

  const addToCart = ({ _id, image, name, price, quantity, category, description, images }) => {
    const itemInCart = state.cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { _id, image, name, price, quantity, category, description, images, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { _id, image, name, price, quantity, category, description, images, purchaseQuantity: 1 });
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error :(</p>;

  return (
    <div className="container mx-auto px-4">
      <Link to={`/products`}>Back To Products</Link>
      <h1 className="text-2xl font-bold text-center my-8">{categoryName} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((item) => (
          <ProductItem
            key={item._id}
            _id={item._id}
            image={item.thumbnail} // Use 'thumbnail' instead of 'image'
            name={item.name}
            description={item.description} // Add 'description'
            price={item.price}
            quantity={item.quantity}
            category={item.category ? item.category.name : ''} // Add 'category'
            addToCart={addToCart} // Pass addToCart function as a prop
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
