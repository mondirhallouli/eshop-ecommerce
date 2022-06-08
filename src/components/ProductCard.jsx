import React from "react";
import "./ProductCard.css";
import { addToCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

function ProductCard({ id, title, price, category, img }) {
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.stopPropagation();
    dispatch(
      addToCart({
        id,
        name: title,
        price,
        category,
        image: img,
      })
    );
  };
  return (
    <div className="product-card">
      <div className="product-card_img">
        <img src={img} alt={title} />
      </div>
      <h2 className="product-card_title">{title.substring(0, 24)}...</h2>
      <h3 className="product-card_price">${price}</h3>
      <button className="product-card_add-to-cart" onClick={handleClick}>
        ADD TO CART
      </button>
    </div>
  );
}

export default ProductCard;