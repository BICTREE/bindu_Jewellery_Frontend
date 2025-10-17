import { axiosPublic } from "@/axios-folder/axios"
import { GetbannerApi } from "@/constants/apiEndpoint"

export const getBanner = async () => {
    const res = await axiosPublic.get(`${GetbannerApi}`)
    return res?.data?.data?.result;
}