import { axiosPublic } from "@/axios-folder/axios"
import { GetAllProductsApi, GetProductByIdApi } from "@/constants/apiEndpoint"

export const GetAllProducts = async (pageNum?: number) => {
    const res = await axiosPublic.get(`${GetAllProductsApi}?page=${pageNum}`)
    return res?.data.data.result
}

export const GetProductById = async (Id?: string) => {
    const res = await axiosPublic.get(`${GetProductByIdApi}/${Id}`)
    return res?.data.data.result
}