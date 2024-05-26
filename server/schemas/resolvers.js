const { User, Product, Category, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    categories: async () => {
      try {
        const categories = await Category.find();
        return categories.map(category => ({
          _id: category._id,
          name: category.name,
          slug: category.slug,
          url: category.url
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    products: async (parent, { category, name }) => {
      try {
        const params = {};

        if (category) {
          const categoryObj = await Category.findOne({ name: category });
          if (categoryObj) {
            params.category_id = categoryObj._id;
          } else {
            console.error("Invalid category name:", category);
            throw new Error('Invalid category name');
          }
        }

        if (name) {
          params.name = {
            $regex: name,
            $options: 'i',
          };
        }

        const products = await Product.find(params).populate('category_id');
        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    product: async (parent, { _id }) => {
      try {
        const product = await Product.findById(_id).populate('category_id');
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
              unit_amount: Math.round(product.price * 100),
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
          // Map each ProductInput to extract necessary fields
          const orderedProducts = products.map(product => ({
            _id: product._id, // _id is the product ID
            quantity: product.purchaseQuantity // purchaseQuantity is the desired quantity
          }));
    
          // Create the order with the ordered products
          const order = new Order({ products: orderedProducts });
    
          // Find the user and push the new order
          await User.findByIdAndUpdate(
            context.user._id,
            { $push: { orders: order } }
          );
    
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
