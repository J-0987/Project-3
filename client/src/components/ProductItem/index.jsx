import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";


function ProductItem({ _id, image, name, price, quantity, category, description, images }) {
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const itemInCart = cart.find((cartItem) => cartItem._id === _id);

  const addToCart = () => {
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

  return (
    <div className="card bg-sky-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={image}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h4 className="font-bold text-lg mb-2">{name}</h4>
          <p className="text-gray-500 mb-2">{category}</p>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <div>{quantity - (itemInCart ? itemInCart.purchaseQuantity : 0)} {pluralize("item", quantity)} in stock</div>
            <span className="font-bold text-lg">${price}</span>
          </div>
        </div>
      </Link>
      <button
        onClick={addToCart}
        className="w-full bg-cyan-500 hover:bg-cyan-600  text-white py-2 px-4 rounded-b-lg transition duration-200"
      >
        {itemInCart ? 'Add One More' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductItem;
