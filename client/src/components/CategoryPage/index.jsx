import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { QUERY_PRODUCTS, QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";


function CategoryPage() {
  const [state, dispatch] = useStoreContext();
  const { categoryName } = useParams();
  const [productList, setProductList] = useState([])
  

  

  return (
    <div className='d-flex flex-wrap'>
      {productList.map((item) => (

        <div key={item.id}>
          {/* Render the item... */}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.images[0]}/>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.description}
              </Card.Text>
              <Card.Text>Price:{item.price}</Card.Text>
              <Card.Text>Stock:{item.stock}</Card.Text>

              <Button onClick={addToCart} variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CategoryPage;