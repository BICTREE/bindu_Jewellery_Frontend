import { axiosPrivate } from "@/axios-folder/axios";
import { AddToCartApi, GetMyCartApi, RemoveCartApi } from "@/constants/apiEndpoint";

// ✅ Define spec type
interface Spec {
  variationId: string;
  optionId: string;
}

// ✅ Cart item type for API
export interface CartItem {
  productId: string;
  quantity: number;
  specs: Spec[];
  giftWrap: boolean;
}

interface UpdateProps {
  itemId: string;
  quantity: number;
}

// Wishlist/Cart APIs
export const getMyCart = async () => {
  const res = await axiosPrivate.get(GetMyCartApi);
  console.log(res, "api response");
  return res?.data?.data?.cart;
};

// Add item to cart
export const AddToCart = async (body: CartItem) => {
  try {
    const response = await axiosPrivate.post(AddToCartApi, body);
    return response.data;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};

// Update cart item
export const UpdateCart = async (body: UpdateProps) => {
  try {
    const response = await axiosPrivate.post(AddToCartApi, body);
    return response.data;
  } catch (error) {
    console.error("Update cart error:", error);
    throw error;
  }
};

// Remove item from cart
export const RemoveFromCart = async (body: { productId: string }) => {
  try {
    const response = await axiosPrivate.post(RemoveCartApi, body);
    return response.data;
  } catch (error) {
    console.error("Remove from cart error:", error);
    throw error;
  }
};
