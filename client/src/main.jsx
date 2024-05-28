import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import About from './pages/About.jsx'
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch'; // changed to Error
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderHistory from './pages/OrderHistory'; //keep name but change location to account info under dropdown 
import Success from './pages/Success';
import ProductList from './components/ProductList'
import CategoryPage from './components/CategoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      }, {
        path: '/products/:id',
        element: <Detail />
      }, {
        path: '/success',
        element: <Success />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/products',
        element: <ProductList />
      },
      {
        path: '/category/:categoryName',
        element: <CategoryPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
