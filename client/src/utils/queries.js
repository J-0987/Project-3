import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID, $name: String) {
    products(category: $category, name: $name) {
      _id
      name
      description
      thumbnail
      images
      quantity
      price
      category_id {
        _id
        name
        slug
        url
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput!]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  query getAllProducts {
    products {
      _id
      name
      description
      thumbnail
      images
      quantity
      price
      category_id {
        _id
        name
        slug
        url
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      name
      slug
      url
    }
  }
`;


export const QUERY_USER = gql`
  query getUser {
    user {
      _id
      firstName
      lastName
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          thumbnail
          images
          quantity
          price
          category_id {
            _id
            name
            slug
            url
          }
        }
      }
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(_id: $id) {
      _id
      name
      description
      thumbnail
      images
      quantity
      price
      category_id {
        _id
        name
        slug
        url
      }
    }
  }
`;

export const QUERY_ORDER = gql`
  query getOrder($id: ID!) {
    order(_id: $id) {
      _id
      purchaseDate
      products {
        _id
        name
        description
        thumbnail
        images
        quantity
        price
        category_id {
          _id
          name
          slug
          url
        }
      }
    }
  }
`;
