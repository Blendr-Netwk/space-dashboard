import { axiosInstance } from "@/service/axios"

export const fetchUserRewards = async (): Promise<any[]> => {
  const res = await axiosInstance({
    url: "/api/rewards/user",
    method: "GET",
  })

  return res.data
}

export const fetchUserNodeRewards = async (): Promise<any[]> => {
  const res = await axiosInstance({
    url: "/api/rewards/user/node-rewards",
    method: "GET",
  })

  return res.data
}

export const fetchTotalRewards = async (): Promise<any[]> => {
  const res = await axiosInstance({
    url: "/api/rewards/user/total",
    method: "GET",
  })

  return res.data
}

export const claimReward = async (): Promise<any[]> => {
  const res = await axiosInstance({
    url: "/api/reward/claim",
    method: "POST",
  })

  return res.data
}
