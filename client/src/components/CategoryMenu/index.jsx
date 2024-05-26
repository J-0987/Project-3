import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData, error } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      console.log('Fetched categories:', categoryData.categories);
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category).catch((err) => {
          console.error('Error saving category to IndexedDB:', err);
        });
      });
    } else if (error) {
      console.error('Error fetching categories:', error);
    } else if (!loading) {
      idbPromise('categories', 'get')
        .then((categories) => {
          console.log('Retrieved categories from IndexedDB:', categories);
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categories,
          });
        })
        .catch((err) => {
          console.error('Error retrieving categories from IndexedDB:', err);
        });
    }
  }, [categoryData, loading, error, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;
