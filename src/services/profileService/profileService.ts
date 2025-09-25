import { axiosPrivate } from "@/axios-folder/axios"
import { GetMyProfileApi, UpdateProfileApi } from "@/constants/apiEndpoint"

// Profile Api
export const GetMyProfile = async () => {
    const res = await axiosPrivate.get(`${GetMyProfileApi}`)
    return res?.data?.data?.user
}


interface NewProfile {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  mobile: string;
}

export const UpdateProfile = async (body: NewProfile) => {
  try {
    const response = await axiosPrivate.put(
      `${UpdateProfileApi}`, // Changed from PUT to POST for creation
      body
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};