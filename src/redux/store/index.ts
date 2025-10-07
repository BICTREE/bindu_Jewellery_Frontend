// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./wishlistSlice";
import cartReducer from "./cartSlice"; // We'll create this for cart
export const store = configureStore({
  reducer: {
    user: userReducer,
     cart: cartReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
