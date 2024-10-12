import { BASE_URL } from "@/constants/app";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 5, // 5 minutes
  //  headers: {'X-Custom-Header': 'foobar'}
});

export const setAxiosJwtToken = (token: string) => {
  axiosInstance.defaults.headers.common = { Authorization: `Bearer ${token}` };
};
