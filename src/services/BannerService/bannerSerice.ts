import { axiosPublic } from "@/axios-folder/axios"
import { GetbannerApi } from "@/constants/apiEndpoint"

export const getBanner = async (pageNum?: number) => {
    const res = await axiosPublic.get(`${GetbannerApi}?page=${pageNum}`)
    return res?.data
}