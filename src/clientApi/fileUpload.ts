import { axiosInstance } from "@/service/axios"

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await axiosInstance.post(
      "/api/file-upload/upload",
      formData
    )
    return response.data
  } catch (err) {
    return null
  }
}

export const getSignedURL = async (cid: string) => {
  try {
    const res = await axiosInstance({
      url: "/api/file-upload/signed-url",
      method: "POST",
      data: {
        cid,
      },
    })
    return res.data
  } catch (err) {
    return null
  }
}
