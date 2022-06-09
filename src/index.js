import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Product from "./components/Product";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:productId" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
