import { axiosPublic } from "@/axios-folder/axios";
import {  SendOTPApi, SignUpApi, VerifyOTPApi } from "@/constants/apiEndpoint";

interface User{
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  mobile: string;
  password: string;
  credType: string;
  otp: string;
}
interface OTPProps {
  email: string;

}
interface VerifyOTPProps {
  email: string;
  otp: string;

}

export const SendOTP = async (body: OTPProps) => {
  try {
    const response = await axiosPublic.post(
      `${SendOTPApi}`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};
export const VerifyOTP = async (body: VerifyOTPProps) => {
  try {
    const response = await axiosPublic.post(
      `${VerifyOTPApi}`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};
export const RegisterUser = async (body: User) => {
  try {
    const response = await axiosPublic.post(
      `${SignUpApi}`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};