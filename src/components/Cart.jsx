import React from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { current } from "@reduxjs/toolkit";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleChange = (event, id) => {
    event.stopPropagation();
    dispatch(updateQuantity({ id, quantity: event.target.value }));
  };

  let qtyTotal = 0;
  let priceTotal = 0;

  for (let item of cartItems) {
    let price = item.quantity * item.price;
    qtyTotal += item.quantity;
    priceTotal += price;
  }

  return (
    <div className="cart">
      <h1 className="cart_title">My Cart</h1>
      <div className="cart_container">
        {cartItems &&
          cartItems.map((item) => (
            <div className="cart_item" key={item.id}>
              <div className="cart_item-left">
                <h3 className="cart_item-name">{item.name}</h3>
                <p className="cart_item-price">${item.price}</p>
                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="cart_remove-item"
                >
                  Remove
                </button>
              </div>

              <div className="cart_item-center">
                <label className="cart_item-quantity" htmlFor="quantity">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min={0}
                  value={item.quantity}
                  onChange={(event) => handleChange(event, item.id)}
                />
              </div>

              <div className="cart_item-right">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart_item-img"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="cart_total">
        <p className="cart_total-items">
          Items: <span>{qtyTotal}</span>
        </p>
        <p className="cart_total-price">
          Total: <span>${priceTotal.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}

export default Cart;
