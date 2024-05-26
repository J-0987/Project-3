const fetch = require("node-fetch");

module.exports = {
  fetchCategories: async function () {
    try {
      console.log("Fetching categories...");
      const categories = await getCategoriesData();
      console.log("Fetched categories:", categories);
      return categories.map((category) => {
        console.log("============================================================= Mapping category:", category);
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
  fetchProduct: async function (productId) {
    try {
      console.log("Fetching product...");
      const productData = await getProductData(productId);
      console.log("Fetched product data:", productData);
      const mappedProduct = {
        name: productData["title"],
        description: productData["description"],
        thumbnail: productData["thumbnail"],
        images: productData["images"],
        price: productData["price"],
        quantity: productData["stock"],
        category: productData["category"],
      };
      console.log("Mapped product:", mappedProduct);
      return mappedProduct;
    } catch (error) {
      console.error("Error fetching product:", error);
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
    return data.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      url: cat.url
    }));
  } catch (error) {
    console.error("Error fetching categories data:", error);
    throw error;
  }
}

async function getProductsData() {
  try {
    console.log("Fetching products data from API...");
    const response = await fetch("https://dummyjson.com/products?limit=0"); // fetch 20 products, change the limit to get more products
    const data = await response.json();
    console.log("Raw products data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw error;
  }
}

async function getProductData(productId) {
  try {
    console.log("Fetching product data from API...");
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    console.log("Raw product data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}
