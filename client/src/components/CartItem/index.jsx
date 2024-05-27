import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        {item.image && item.image.length > 0 ? (
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100px', height: '100px' }}
          />
        ) : (
          <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc' }}>
            No Image
          </div>
        )}
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
            min="0"
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
