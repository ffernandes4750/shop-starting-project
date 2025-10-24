import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Cart } from "../../types/cart.ts";

const initialState: Cart = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ _id: string; name: string; price: number }>
    ) => {
      const { _id, name, price } = action.payload;
      const existing = state.items.find((i) => i._id === _id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ _id, name, price, quantity: 1 });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; change: number }>
    ) => {
      const { _id, change } = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (!item) return;
      item.quantity += change;
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i._id !== _id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
