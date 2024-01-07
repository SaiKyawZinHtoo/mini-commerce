import { CancelOrderOption, CardSlice, CreateOrderOption } from "@/types/card";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CardSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "card/createOrder",
  async (options: CreateOrderOption, thunkApi) => {
    const { payload, onSuccess, onError } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromServer = await respone.json();
      onSuccess && onSuccess(dataFromServer);
    } catch (err) {
      onError && onError(err);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "card/cancelOrder",
  async (options: CancelOrderOption, thunkApi) => {
    const { orderId, onSuccess, onError } = options;
    try {
      await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
        method: "DELETE",
      });
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  }
);

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
