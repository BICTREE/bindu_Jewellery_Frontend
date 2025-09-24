// axios.ts
import { BASE_URL } from "@/constants/apiEndpoint";
import axios from "axios";
import { getSession } from "next-auth/react";

// 🌍 Public instance (no token required)
const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔐 Private instance (with token)
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach accessToken from NextAuth to each request
axiosPrivate.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      console.log("✅ Authorization header added:", config.headers["Authorization"]);
    } else {
      console.warn("⚠️ No access token found in session");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosPublic, axiosPrivate };
