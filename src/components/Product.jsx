import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";
import { addToCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

function Product() {
  // react router hook to access URL parameters
  const { productId } = useParams();
  let [product, setProduct] = useState(null);
  let [loading, setLoading] = useState(false);
  let componentMounted = true;
  // redux distpatch hook to dispatch actions
  const dispatch = useDispatch();

  //   fetching the product details from the API
  useEffect(() => {
    const fetchProduct = async () => {
      // set the loading state to true to display a spinner
      setLoading(true);
      let response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      if (componentMounted) {
        setProduct(await response.json());
        setLoading(false);
      }

      // change variable to false when the component unmounts to stop background fetching
      return () => {
        componentMounted = false;
      };
    };

    fetchProduct();
    // we want to perform the effect whenever the product ID changes (i.e. product changes)
  }, [productId]);

  //   adding the product to the cart
  const handleClick = (event) => {
    event.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
      })
    );
  };

  return (
    <div className="product">
      {/* LOADING STATE SPINNER  */}
      {loading && (
        <div className="products_loading">
          <TailSpin
            height="100"
            width="100"
            color="dodgerblue"
            ariaLabel="loading"
          />
          <p className="products_loading-text">Just a moment...</p>
        </div>
      )}
      {/* PRODUCT DETAILS DISPLAY */}
      {product && (
        <div className="product_container">
          <div className="product_img">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product_details">
            <h3 className="product_category">In {product.category}</h3>
            <h1 className="product_name">{product.title}</h1>
            <h2 className="product_price">${product.price.toFixed(2)}</h2>
            <p className="product_desc">{product.description}</p>
            <button className="product_add" onClick={handleClick}>
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
