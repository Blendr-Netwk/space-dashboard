import { BASE_URL } from "@/constants/app"
import axios from "axios"
import { LOCAL_STORAGE_AUTH_KEY } from "@/constants/app"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 5, // 5 minutes
})

export const setAxiosJwtToken = (token: string) => {
  axiosInstance.defaults.headers.common = { Authorization: `Bearer ${token}` }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use((response) => response)
