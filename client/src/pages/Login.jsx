import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = data.login.token;
      Auth.login(token);
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="youremail@test.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="******"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">
              The provided credentials are incorrect.
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm mt-4">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
