import { axiosInstance } from "@/service/axios"

export const fetchAllAiModels = async (): Promise<any[]> => {
    const res = await axiosInstance({
        url: '/api/ai/models',
        method: "GET",
    })

    return res.data
}


// export const fetchAllAiModels = async () => {
    
// }

///ai/models