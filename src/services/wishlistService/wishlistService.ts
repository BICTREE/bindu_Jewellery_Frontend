import { axiosPrivate } from "@/axios-folder/axios"
import { GetMyWhishlist } from "@/constants/apiEndpoint"

export const getMyList = async () => {
    const res = await axiosPrivate.get(GetMyWhishlist)
    console.log(res,"api response")
    return res?.data?.data?.wishlist
}