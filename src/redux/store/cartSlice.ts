// src/store/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMyCart } from '@/services/cartService/cartService';

// Define proper types for cart items
export interface CartSpec {
  variationId: string;
  optionId: string;
}

export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  specs: CartSpec[];
  giftWrap: boolean;
  product?: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
}

interface CartState {
  count: number;
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  count: 0,
  items: [],
  loading: false,
};

// Async thunk to fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const cart = await getMyCart();
      return cart || [];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementCartCount: (state) => {
      state.count += 1;
    },
    decrementCartCount: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    clearCart: (state) => {
      state.count = 0;
      state.items = [];
    },
    // Only increment if product not already in cart
    incrementCartCountIfNew: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      const existingItem = state.items.find((item: CartItem) => item.productId === productId);
      
      // Only increment count if product is not already in cart
      if (!existingItem) {
        state.count += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.count = 0;
        state.items = [];
      });
  },
});

export const { 
  updateCartCount, 
  incrementCartCount, 
  decrementCartCount, 
  setCartCount, 
  clearCart,
  incrementCartCountIfNew
} = cartSlice.actions;
export default cartSlice.reducer;