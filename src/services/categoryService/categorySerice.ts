import { axiosPublic } from "@/axios-folder/axios"
import { GetCategoryApi } from "@/constants/apiEndpoint"

export const getAllCategory = async () => {
    const res = await axiosPublic.get(`${GetCategoryApi}`)
    return  res?.data?.data?.result
}