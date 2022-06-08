import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let newItem = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: 1,
        category: action.payload.category,
        image: action.payload.image,
      };

      state.cartItems.push(newItem);
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems.splice(index, 1);
    },
    updateQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[index].quantity = Number(action.payload.quantity);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
