import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetMyProfile } from "@/services/profileService/profileService";
import { AddToWishlist, RemoveFromWishlist } from "@/services/wishlistService/wishlistService";

type UserState = {
  _id: string | null;
  wishlist: string[];
  loading: boolean;
};

const initialState: UserState = {
  _id: null,
  wishlist: [],
  loading: false,
};

// ✅ Fetch user profile (once on login/app load)
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const data = await GetMyProfile();
  return data; // { _id, wishlist, ... }
});

// ✅ Toggle wishlist item
export const toggleWishlist = createAsyncThunk(
  "user/toggleWishlist",
  async (
    { userId, productId, inWishlist }: { userId: string; productId: string; inWishlist: boolean },
    { rejectWithValue }
  ) => {
    try {
      if (inWishlist) {
        await RemoveFromWishlist({ userId, productId });
        return { productId, action: "remove" };
      } else {
        await AddToWishlist({ userId, productId });
        return { productId, action: "add" };
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state._id = null;
      state.wishlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state._id = action.payload._id;
        state.wishlist = action.payload.wishlist || [];
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        if (action.payload.action === "add") {
          state.wishlist.push(action.payload.productId);
        } else {
          state.wishlist = state.wishlist.filter((id) => id !== action.payload.productId);
        }
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
