import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51PKXrzRtKETGJw5VRsP0ypWaHSYpKiPB4To1NDLfVG0C4zHFBh3CtaoTJGAHcmYauN1YhQ7M57huU50pKW3aPPep00AlVsOfMB');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { loading, data, error }] = useLazyQuery(QUERY_CHECKOUT);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (error) {
      console.error('Error fetching checkout session:', error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session })
          .then(result => {
            if (result.error) {
              console.error('Error redirecting to checkout:', result.error);
            }
          });
      }).catch(err => {
        console.error('Error loading Stripe:', err);
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      try {
        const cart = await idbPromise('cart', 'get');
        dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      } catch (err) {
        console.error('Error getting cart from IndexedDB:', err);
      }
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    getCheckout({
      variables: {
        products: [...state.cart],
      },
    });
  }

  return (
    <>
      <Button className="cart-JJ" onClick={handleShow}>
        <FontAwesomeIcon icon={faCartShopping} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state.cart.length ? (
            <div>
              {state.cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}

              <div className="flex-row space-between">
                <strong>Total: ${calculateTotal()}</strong>

                {Auth.loggedIn() ? (
                  <Button variant="primary" onClick={submitCheckout} disabled={loading}>
                    {loading ? 'Loading...' : 'Checkout'}
                  </Button>
                ) : (
                  <span>(log in to check out)</span>
                )}
              </div>
            </div>
          ) : (
            <h3>
              <span role="img" aria-label="shocked">
                😱
              </span>
              You haven't added anything to your cart yet!
            </h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
