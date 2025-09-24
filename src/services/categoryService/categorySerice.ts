import { axiosPublic } from "@/axios-folder/axios"
import { GetCategoryApi } from "@/constants/apiEndpoint"

export const getAllCategory = async (pageNum?: number) => {
    const res = await axiosPublic.get(`${GetCategoryApi}?page=${pageNum}`)
    return res?.data
}