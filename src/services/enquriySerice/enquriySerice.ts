import { axiosPublic } from "@/axios-folder/axios";
import { SendEnquriyApi } from "@/constants/apiEndpoint";

interface NewEnquriy {
  type: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}
// SendEnquriy Api
export const SendEnquriy = async (body: NewEnquriy) => {
  try {
    const response = await axiosPublic.post(
      `${SendEnquriyApi}`, // Changed from PUT to POST for creation
      body
    );
    return response.data;
  } catch (error) {
    console.error("Expert creation error:", error);
    throw error;
  }
};