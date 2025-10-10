import { axiosPublic } from "@/axios-folder/axios";
import { GetAllBlogsApi, GetBlogBySlugApi } from "@/constants/apiEndpoint";

 export type MediaQueryParams = {
  page?: number;
  entries?: number;
  search?: string;
  tag?: string;
  author?: string;
};

export const GetAllBlogs = async (params?: MediaQueryParams) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${GetAllBlogsApi}?${queryString}` : GetAllBlogsApi;

    const res = await axiosPublic.get(url);
    return res?.data?.data?.result;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const GetBlogBySlug = async (slug: string, params?: MediaQueryParams) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const url = queryString 
      ? `${GetBlogBySlugApi}/${slug}?${queryString}` 
      : `${GetBlogBySlugApi}/${slug}`;

    const res = await axiosPublic.get(url);
    return res?.data?.data?.blog;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw error;
  }
};