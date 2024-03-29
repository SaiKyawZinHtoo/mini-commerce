import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cardReducer from "./slices/cardSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    card: cardReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
