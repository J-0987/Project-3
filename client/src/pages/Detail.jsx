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

  const itemInCart = cart.find((cartItem) => cartItem._id === id);

  const addToCart = () => {
    console.log(currentProduct);

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

      const product = {
        _id: currentProduct._id, 
        image: currentProduct.images[0], 
        name: currentProduct.name, 
        price: currentProduct.price, 
        quantity: currentProduct.quantity, 
        category: currentProduct.category, 
        description: currentProduct.description, 
        images: currentProduct.images,
        purchaseQuantity: 1,
      }
      dispatch({
        type: ADD_TO_CART,
        product: product });
      idbPromise('cart', 'put', product);
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        <div style={{ margin: '0 auto', padding: '16px', maxWidth: '800px' }}>
          {currentProduct && (
            <>
              <Link to="/" style={{ display: 'block', marginBottom: '16px', color: '#3b82f6' }}>
                ← Back to Products
              </Link>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>{currentProduct.name}</h2>
              {currentProduct.images && currentProduct.images.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <img 
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    style={{ width: '460px', height: '460px', objectFit: 'contain' }}
                  />
                </div>
              )}
              <p style={{ marginBottom: '16px' }}>{currentProduct.description}</p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ marginRight: '8px' }}>PRICE: ${currentProduct.price}</strong>
                <br />
                <br />
                <button
                  onClick={addToCart}
                  style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '8px 16px', borderRadius: '4px', marginRight: '8px' }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={removeFromCart}
                  disabled={!cart.find((p) => p._id === currentProduct._id)}
                  style={{ backgroundColor: '#ef4444', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}
                >
                  Remove from Cart
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Detail;
