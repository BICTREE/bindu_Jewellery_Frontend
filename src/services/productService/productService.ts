import { axiosPublic } from "@/axios-folder/axios"
import { GetAllProductsApi } from "@/constants/apiEndpoint"

export const GetAllProducts = async (pageNum?: number) => {
    const res = await axiosPublic.get(`${GetAllProductsApi}?page=${pageNum}`)
    return res?.data.data.result
}