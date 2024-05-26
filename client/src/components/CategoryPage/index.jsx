import { useParams } from 'react-router-dom';
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';

function CategoryPage() {
  const { categoryName } = useParams();
  const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
    variables: { category: categoryName }, // Pass category slug
  });

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error :(</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-8">{categoryName} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
            <img src={item.thumbnail} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="mt-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-700 my-2">{item.description}</p>
              <p className="text-green-600 font-bold">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
