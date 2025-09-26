import { axiosPrivate } from "@/axios-folder/axios"
import { AddToWhishlistApi, GetMyWhishlist, RemoveFromWhishlistApi } from "@/constants/apiEndpoint"

interface List {
  userId: string;
  productId: string;
}
// Wishlist Api
export const getMyList = async () => {
    const res = await axiosPrivate.get(GetMyWhishlist)
    console.log(res,"api response")
    return res?.data?.data?.wishlist
}


export const AddToWishlist = async (body: List) => {
  try {
    const response = await axiosPrivate.post(
      `${AddToWhishlistApi}`, // Changed from PUT to POST for creation
      body
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};
export const RemoveFromWishlist = async (body: List) => {
  try {
    const response = await axiosPrivate.post(
      `${RemoveFromWhishlistApi}`, // Changed from PUT to POST for creation
      body
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};