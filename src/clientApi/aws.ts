import { axiosInstance } from "@/service/axios"
import axios from "axios";

type IGeneratePredefinedUrl = {
    fileName: string;
    fileType: string;
}

export const generatePredefinedUrl = async (formData: IGeneratePredefinedUrl) => {
    console.log('Generating pre-signed URL:', formData);
    const res = await axiosInstance({
        url: '/api/generate/presigned-url',
        method: "POST",
        data: formData
    })

    return res.data
}

export const uploadToAwsUsingPredefinedUrl = async (url: string, file: any) => {
    try {
        const response = await axios.put(url, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        return url.split('?')[0];
    } catch (error) {
        console.error('Error during file upload:', error);
        return null;
    }
}




export const fetchInstanceTypes = async () => {
    const res = await axiosInstance({
        url: '/api/instance-types',
        method: "GET",
    })

    return res.data
}

export const createInstance = async (data: any) => {
    const res = await axiosInstance({
        url: '/api/create/instance',
        method: "POST",
        data: data
    })

    return res.data
}
export const fetchInstanceStatus = async (instanceId: string) => {
    const res = await axiosInstance({
        url: `/api/status/instance/${instanceId}`,
        method: "GET",
    })

    return res.data
}


export const fetchMyInstances = async () => {
    const res = await axiosInstance({
        url: '/api/my-instances',
        method: "GET",
    })
    return res.data
}

export const fetchMyKeypair = async (keyName: string) => {
    const res = await axiosInstance({
        url: '/api/instances/keypair/' + keyName,
        method: "GET",
    })
    return res.data
}


export const fetchMyTransactions = async()=>{
    const res = await axiosInstance({
        url: '/api/transactions',
        method: "GET",
    })
    return res.data
}