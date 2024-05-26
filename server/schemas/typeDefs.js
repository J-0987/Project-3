const typeDefs = `
type Category {
  _id: ID
  name: String
  slug: String
  url: String
}

type Product {
  _id: ID
  name: String
  description: String
  thumbnail: String
  images: [String]
  quantity: Int
  price: Float
  category_id: Category
}

type Order {
  _id: ID
  purchaseDate: String
  products: [Product]
}

type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  orders: [Order]
}

type Checkout {
  session: ID
}

type Auth {
  token: ID
  user: User
}

input ProductInput {
  _id: ID
  image: String
  name: String
  price: Float
  quantity: Int
  category: String  # Add this field
  description: String  # Add this field
  purchaseQuantity: Int
}

type Query {
  categories: [Category]  # Include the categories query
  products(category: ID, name: String): [Product]
  product(_id: ID!): Product
  user: User
  order(_id: ID!): Order
  checkout(products: [ProductInput]): Checkout
}

type Mutation {
  addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  addOrder(products: [ProductInput]!): Order 
  updateUser(firstName: String, lastName: String, email: String, password: String): User
  updateProduct(_id: ID!, quantity: Int!): Product
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
