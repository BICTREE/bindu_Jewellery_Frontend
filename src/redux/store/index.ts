// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
