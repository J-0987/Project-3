import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {QUERY_PRODUCTS, QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';


function CategoryPage() {
  
    const { categoryName } = useParams();
    const { loading, error, data } = useQuery(QUERY_PRODUCTS , {
      variables: { category: categoryName },
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  

    return (
        <div>
          {data.products.map((item) => (
            <div key={item._id}>
              {/* Render the item... */}
            </div>
          ))}
        </div>
      );
}

export default CategoryPage;