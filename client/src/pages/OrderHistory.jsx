import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Button from 'react-bootstrap/Button';

function OrderHistory() {
  const { loading, data } = useQuery(QUERY_USER);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data ? data.user : null;

  return (
    <>
      <div className="container my-1">
        <Link to="/">
        <Button className='gotoLogin' type="submit">
        Back
      </Button>
        
        </Link>

        {user ? (
          <>
            <h2>
              {/* Order History for {user.firstName} {user.lastName} */}

              Your Order History
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, thumbnail, name, price }) => (
                    <div key={_id} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${thumbnail}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <h4>You haven't placed any orders yet!</h4>
        )}
      </div>
    </>
  );
}

export default OrderHistory;
