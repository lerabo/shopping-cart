import { useState, useEffect } from "react";

import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://shop-72b6d-default-rtdb.firebaseio.com/items.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          title: responseData[key].title,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.ProductsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.ProductsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const productList = products.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      title={product.title}
      price={product.price}
      description={product.description}
    />
  ));

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productList}</ul>
    </section>
  );
};

export default Products;
