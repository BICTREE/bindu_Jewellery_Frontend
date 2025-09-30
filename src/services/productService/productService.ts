import { axiosPublic } from "@/axios-folder/axios"
import { GetAllProductsApi, GetProductByIdApi } from "@/constants/apiEndpoint"

type ProductQueryParams = {
  page?: number;
  entries?: number;
  category?: string; // comma-separated IDs
  purity?: string;   // comma-separated purities
  minPrice?: number;
  maxPrice?: number;
  weight?: string;   // comma-separated weights
  tag?: string;      // comma-separated tags
};

export const GetAllProducts = async (params?: ProductQueryParams) => {
    const queryParams = new URLSearchParams();
    
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                // Handle arrays - convert to comma-separated string
                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        queryParams.append(key, value.join(','));
                    }
                } else {
                    queryParams.append(key, String(value));
                }
            }
        });
    }
    
    const queryString = queryParams.toString();
    const url = queryString ? `${GetAllProductsApi}?${queryString}` : GetAllProductsApi;
    
    const res = await axiosPublic.get(url);
    return res?.data.data;
}
export const GetProductById = async (Id?: string) => {
    const res = await axiosPublic.get(`${GetProductByIdApi}/${Id}`)
    return res?.data.data.result
}