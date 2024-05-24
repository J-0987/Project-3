//mutations.js
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      _id
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        image
        category_id {
          _id
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($firstName: String, $lastName: String, $email: String, $password: String) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $quantity: Int!) {
    updateProduct(_id: $id, quantity: $quantity) {
      _id
      name
      description
      price
      quantity
      image
      category_id {
        _id
        name
      }
    }
  }
`;
