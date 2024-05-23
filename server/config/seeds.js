//
const db = require("./connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");
const { fetchProducts, fetchCategories } = require("../utils/get-products-util");
const mongoose = require('mongoose');

db.once("open", async () => {
  try {
    console.log("Starting database seeding...");

    // Clean the database
    await cleanDB("Category", "categories");
    await cleanDB("Product", "products");
    await cleanDB("User", "users");
    console.log("Database cleaned");

    // Fetch the transformed categories
    const incomingCategories = await fetchCategories();
    console.log("Incoming categories:", incomingCategories);

    // Insert the categories into the database
    const categories = await Category.insertMany(incomingCategories);
    console.log("Saved categories:", categories);

    // Fetch the transformed products
    const incomingProducts = await fetchProducts();
    console.log("Incoming products:", incomingProducts);

    // Check for products with null category
    const productsWithNullCategory = incomingProducts.filter((product) => !product.category);
    if (productsWithNullCategory.length > 0) {
      console.warn("Products with null category:", productsWithNullCategory);
    }

    // Process the incoming products
    const processedProducts = incomingProducts.map((product) => {
      try {
        const matchedCategory = categories.find(
          (c) => c.name.toLowerCase() === product.category.toLowerCase()
        );

        if (!matchedCategory) {
          console.warn(`No matching category found for product: ${product.name}`);
          return {
            name: product.name,
            description: product.description,
            thumbnail: product.thumbnail,
            images: product.images,
            price: product.price,
            quantity: product.quantity,
            category_id: null,
          };
        }

        console.log(`Matched category for product ${product.name}: ${matchedCategory.name}`);

        return {
          name: product.name,
          description: product.description,
          thumbnail: product.thumbnail,
          images: product.images,
          price: product.price,
          quantity: product.quantity,
          category_id: matchedCategory._id,
        };
      } catch (error) {
        console.error("Error processing product:", product, error);
        return null;
      }
    }).filter((product) => product !== null); // Filter out null products

    console.log("Processed products:", processedProducts);

    // Insert the processed products into the database
    const products = await Product.insertMany(processedProducts);
    console.log("Products seeded:", products);

    // Create users with orders
    const userProducts = products.map((product) => product._id); // Get the _id of each product
    console.log("User products:", userProducts);

    await User.create({
      firstName: "Pamela",
      lastName: "Washington",
      email: "pamela@testmail.com",
      password: "password12345",
      orders: [
        {
          products: userProducts, // Assign all inserted products to the user's order
        },
      ],
    });

    await User.create({
      firstName: "Elijah",
      lastName: "Holt",
      email: "eholt@testmail.com",
      password: "password12345",
    });

    console.log("Users seeded");

    process.exit();
  } catch (error) {
    console.error("An error occurred during database seeding:", error);
    process.exit(1); // Exit with non-zero status to indicate failure
  }
});
