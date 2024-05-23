const { User, Product, Category, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      try {
        const categories = await Category.find();
        console.log("Fetched categories:", categories);
        return categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    products: async (parent, { category, name }) => {
      try {
        const params = {};

        if (category) {
          params.category_id = category;
        }

        if (name) {
          params.name = {
            $regex: name,
          };
        }

        const products = await Product.find(params).populate('category_id');
        console.log("Fetched products with params:", params, products);
        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    product: async (parent, { _id }) => {
      try {
        const product = await Product.findById(_id).populate('category_id');
        console.log("Fetched product by ID:", _id, product);
        return product;
      } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
      }
    },
    user: async (parent, args, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category_id',
          });

          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

          console.log("Fetched user:", user);
          return user;
        }
        throw new AuthenticationError('Not authenticated');
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
    order: async (parent, { _id }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category_id',
          });

          const order = user.orders.id(_id);
          console.log("Fetched order:", order);
          return order;
        }
        throw new AuthenticationError('Not authenticated');
      } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
      }
    },
    checkout: async (parent, args, context) => {
      try {
        const url = new URL(context.headers.referer).origin;
        await Order.create({ products: args.products.map(({ _id }) => _id) });
        const line_items = [];

        for (const product of args.products) {
          line_items.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.name,
                description: product.description,
                images: [`${url}/images/${product.thumbnail}`],
              },
              unit_amount: product.price * 100,
            },
            quantity: product.purchaseQuantity,
          });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
        });

        console.log("Created checkout session:", session.id);
        return { session: session.id };
      } catch (error) {
        console.error("Error creating checkout session:", error);
        throw error;
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        console.log("Added user:", user);
        return { token, user };
      } catch (error) {
        console.error("Error adding user:", error);
        throw error;
      }
    },
    addOrder: async (parent, { products }, context) => {
      try {
        if (context.user) {
          const order = new Order({ products });

          await User.findByIdAndUpdate(context.user._id, {
            $push: { orders: order },
          });

          console.log("Added order:", order);
          return order;
        }
        throw new AuthenticationError('Not authenticated');
      } catch (error) {
        console.error("Error adding order:", error);
        throw error;
      }
    },
    updateUser: async (parent, args, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(context.user._id, args, {
            new: true,
          });
          console.log("Updated user:", updatedUser);
          return updatedUser;
        }
        throw new AuthenticationError('Not authenticated');
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    updateProduct: async (parent, { _id, quantity }) => {
      try {
        const decrement = Math.abs(quantity) * -1;
        const updatedProduct = await Product.findByIdAndUpdate(
          _id,
          { $inc: { quantity: decrement } },
          { new: true }
        );
        console.log("Updated product:", updatedProduct);
        return updatedProduct;
      } catch (error) {
        console.error("Error updating product:", error);
        throw error;
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          console.error("Incorrect email or password - email not found");
          throw new AuthenticationError('Incorrect email or password');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          console.error("Incorrect email or password - incorrect password");
          throw new AuthenticationError('Incorrect email or password');
        }

        const token = signToken(user);
        console.log("User logged in:", user);
        return { token, user };
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
