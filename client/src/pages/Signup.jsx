import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './index.css'
import imageLogin from './assets/login.jpg'

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <Link to="/login">
      <Button className='gotoLogin' type="submit">
        Go To Login
      </Button>
     </Link>

      <h2>Signup</h2>

      <Form onSubmit={handleFormSubmit}>

     

      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control name="firstName"  onChange={handleChange} type="first" placeholder="First" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="last"  name="lastName"  onChange={handleChange} placeholder="Last" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  name="email"  onChange={handleChange} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  name="password"  onChange={handleChange} placeholder="Password" />
      </Form.Group>
   
    
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
      {/* <img src={imageLogin} alt="" /> */}
    </div>
  );
}

export default Signup;
