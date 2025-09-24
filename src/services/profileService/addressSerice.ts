import { axiosPrivate } from "@/axios-folder/axios";
import { AddMyAddressApi, DeleteMyAddressApi, GetMyAddressApi, UpdateMyAddressApi } from "@/constants/apiEndpoint";


interface NewAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNumber: string;
}

// Profile Api
export const GetMyAddress = async () => {
    const res = await axiosPrivate.get(`${GetMyAddressApi}`)
    console.log(res,"respsone")
    return res?.data?.data?.result
}

export const AddAddress = async (body: NewAddress) => {
  try {
    const response = await axiosPrivate.post(
      `${AddMyAddressApi}`, // Changed from PUT to POST for creation
      body
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};
export const UpdateAddress = async ({
  id,
  body,
}: {
  id: string;
  body: NewAddress;
}) => {
  try {
    const response = await axiosPrivate.put(
      `${UpdateMyAddressApi}/${id}`, // ✅ include id in URL
      body
    );
    return response.data;
  } catch (error) {
    console.error("Update address error:", error);
    throw error;
  }
};
export const deleteAddress = async (id: string) => {
  try {
    const response = await axiosPrivate.delete(
      `${DeleteMyAddressApi}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};