import { axiosPublic } from "@/axios-folder/axios";
import { GetGroupMediaApi, GetMediaApi } from "@/constants/apiEndpoint";

type MediaQueryParams = {
  page?: number;
  entries?: number;
  search?: string;
  filetype?: string;
};

export const GetAllMedia = async (params?: MediaQueryParams) => {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, String(value));
      }
    });
  }

  const queryString = queryParams.toString();
  const url = queryString ? `${GetMediaApi}?${queryString}` : GetMediaApi;

  const res = await axiosPublic.get(url);
  return res?.data?.data?.result;
};

export const GetAllGroupMedia = async (params?: MediaQueryParams) => {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, String(value));
      }
    });
  }

  const queryString = queryParams.toString();
  const url = queryString ? `${GetGroupMediaApi}?${queryString}` : GetGroupMediaApi;

  const res = await axiosPublic.get(url);
  return res?.data?.data?.result;
};
