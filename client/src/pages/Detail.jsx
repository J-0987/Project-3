import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import { QUERY_PRODUCT } from '../utils/queries';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { id: id },
  });

  const { cart } = state;

  useEffect(() => {
    if (data && data.product) {
      setCurrentProduct(data.product);
    }
  }, [data]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', {
        ...currentProduct,
        purchaseQuantity: 1,
      });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          {currentProduct && (
            <>
              <Link to="/" className="block mb-4 text-blue-500">
                ← Back to Products
              </Link>
              <h2 className="text-3xl font-bold mb-2">{currentProduct.name}</h2>
              {currentProduct.images && currentProduct.images.length > 0 && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    className="w-16 h-16"
                  />
                </div>
              )}
              <p className="mb-4">{currentProduct.description}</p>
              <p className="mb-4">
                <strong className="mr-2">${currentProduct.price}</strong>
                <button
                  onClick={addToCart}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={removeFromCart}
                  disabled={!cart.find((p) => p._id === currentProduct._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove from Cart
                </button>
              </p>
            </>
          )}
        </div>
      )}
      {/* <Cart /> */}
    </>
  );
}

export default Detail;
