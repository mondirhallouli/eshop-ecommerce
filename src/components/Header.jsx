import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  return (
    <div className="header">
      <Link to="/" className="header_brand">
        E-Shop
      </Link>
      <Link to="/cart" className="header_cart">
        Cart <span className="header_cart-count">({cartCount})</span>
      </Link>
    </div>
  );
}

export default Header;
