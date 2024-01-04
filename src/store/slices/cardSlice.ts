import { CardSlice } from "@/types/card";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CardSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateQuantity: (state, action) => {
      const quantity = action.payload.quantity;
      if (!quantity) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
    },
  },
});

export const { addToCard, updateQuantity } = cardSlice.actions;
export default cardSlice.reducer;
