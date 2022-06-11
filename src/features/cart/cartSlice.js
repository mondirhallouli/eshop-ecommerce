import { createSlice } from "@reduxjs/toolkit";

// initial state for the cart
const initialState = {
  cartItems: [],
};

// cartSlice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart functionality
    addToCart: (state, action) => {
      let newItem = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: 1,
        category: action.payload.category,
        image: action.payload.image,
      };

      // check if item already added and add one to it
      let exists = state.cartItems.findIndex((item) => item.id === newItem.id);
      if (exists >= 0) state.cartItems[exists].quantity += 1;
      else state.cartItems.push(newItem);
    },
    // delete from cart functionality
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems.splice(index, 1);
    },
    // update item quantity function
    updateQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[index].quantity = Number(action.payload.quantity);
    },
  },
});

// actions
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
// cart reducer
export default cartSlice.reducer;
