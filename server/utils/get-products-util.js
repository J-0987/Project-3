const fetch = require("node-fetch");

module.exports = {
  fetchCategories: async function () {
    try {
      console.log("Fetching categories...");
      const categories = await getCategoriesData();
      console.log("Fetched categories:", categories);
      return categories.map((category) => {
        console.log("Mapping category:", category);
        return { name: category };
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  fetchProducts: async function () {
    try {
      console.log("Fetching products...");
      const productsData = await getProductsData();
      const products = productsData["products"];
      console.log("Fetched products data:", products);
      return products.map((product) => {
        const mappedProduct = {
          name: product["title"],
          description: product["description"],
          thumbnail: product["thumbnail"],
          images: product["images"],
          price: product["price"],
          quantity: product["stock"],
          category: product["category"],
        };
        console.log("Mapped product:", mappedProduct);
        return mappedProduct;
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};

async function getCategoriesData() {
  try {
    console.log("Fetching categories data from API...");
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    console.log("Raw categories data received:", data);
    const cleanCat = await data.map((cat) => cat.name);
    console.log("Clean categories data:", cleanCat);
    return cleanCat;
  } catch (error) {
    console.error("Error fetching categories data:", error);
    throw error;
  }
}

async function getProductsData() {
  try {
    console.log("Fetching products data from API...");
    const response = await fetch("https://dummyjson.com/products?limit=20"); // fetch 2 products, change the limit to get more products
    const data = await response.json();
    console.log("Raw products data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw error;
  }
}
