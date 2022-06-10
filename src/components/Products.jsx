import React, { useEffect, useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";
import ProductCard from "./ProductCard";
import "./Products.css";

function Products() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [filtered, setFiltered] = useState(products);
  let componentMounted = true;

  let getCategory = (cat) => {
    let updatedProducts = products.filter(
      (product) => product.category === cat
    );
    setFiltered(updatedProducts);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setProducts(await response.clone().json());
        setFiltered(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    fetchProducts();
  }, []);

  function Loading() {
    return (
      <div className="products_loading">
        <TailSpin
          height="100"
          width="100"
          color="dodgerblue"
          ariaLabel="loading"
        />
        <p className="products_loading-text">Just a moment...</p>
      </div>
    );
  }

  return (
    <div className="products">
      <h1 className="products_category">Latest products</h1>
      <nav className="products_filter">
        <button
          className="products_filter-option"
          onClick={() => setFiltered(products)}
        >
          All
        </button>
        <button
          className="products_filter-option"
          onClick={() => getCategory("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className="products_filter-option"
          onClick={() => getCategory("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className="products_filter-option"
          onClick={() => getCategory("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="products_filter-option"
          onClick={() => getCategory("electronics")}
        >
          Electronics
        </button>
      </nav>
      {loading && <Loading />}
      <section className="products_container">
        {filtered &&
          filtered.map((product) => (
            <ProductCard
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              img={product.image}
              key={product.id}
            />
          ))}
      </section>
    </div>
  );
}

export default Products;
