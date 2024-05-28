import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");

      const products = cart.map((item) => {
        return {
          _id: item._id,
          image: item.image,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          description: item.description,
          purchaseQuantity: item.purchaseQuantity,
        };
      });

      if (products.length) {
        const { data } = await addOrder({ variables: { products: products } });
        const productData = data.addOrder.products;
        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      setTimeout(() => {
        window.location.assign("/orderHistory");
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
