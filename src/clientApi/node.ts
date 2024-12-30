import { axiosInstance } from "@/service/axios"

export const getActiveNodes = async (): Promise<any[]> => {
  const res = await axiosInstance({
    url: "/api/active/nodes",
    method: "GET",
  })
  return res.data
}

export const getAllNodes = async (): Promise<any[]> => {
  const res = await axiosInstance({
    url: "/api/nodes",
    method: "GET",
  })
  return res.data
}

export const fetchMyNodes = async (): Promise<any[]> => {
  try {
    const res = await axiosInstance({
      url: "/api/my-nodes",
      method: "GET",
    })
    return res.data
  } catch (err) {
    return []
  }
}

export const fetchRentalNodes = async (): Promise<any[]> => {
  try {
    const res = await axiosInstance({
      url: "/api/rental-nodes",
      method: "GET",
    })
    return res.data
  } catch (err) {
    return []
  }
}

export const fetchTasks = async (): Promise<any> => {
  const res = await axiosInstance({
    url: "/api/tasks",
    method: "GET",
  })
  return res.data
}

export const postNewTask = async (data: any): Promise<any> => {
  const res = await axiosInstance({
    url: "/api/add/new-task",
    method: "POST",
    data: data,
  })
  return res.data
}

export const fetchLogs = async (taskId: string): Promise<any> => {
  const res = await axiosInstance({
    url: `/api/logs/${taskId}`,
    method: "GET",
  })
  return res.data
}

export const lendGpuApi = async (data: any): Promise<any> => {
  const res = await axiosInstance({
    url: `/api/lend/gpu`,
    method: "POST",
    data,
  })
  return res.data
}

export const rentGpu = async (data: any): Promise<any> => {
  const res = await axiosInstance({
    url: `/api/rent/gpu`,
    method: "POST",
    data,
  })
  return res.data
}

export const rentClaim = async (): Promise<any> => {
  const res = await axiosInstance({
    url: `/api/rent/claim`,
    method: "POST",
  })
  return res.data
}

export const rentRefund = async (data: any): Promise<any> => {
  const res = await axiosInstance({
    url: `/api/rent/refund`,
    method: "POST",
    data,
  })
  return res.data
}