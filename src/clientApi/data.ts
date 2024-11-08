import { axiosInstance } from "@/service/axios"

export const fetchPricePair = async (): Promise<any> => {
  try {
    const res = await axiosInstance({
      url: `/api/crypto-pairs`,
      method: "GET",
    })
    return res.data
  } catch (err) {
    return null
  }
}
