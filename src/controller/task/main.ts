import { generatePredefinedUrl, uploadToAwsUsingPredefinedUrl } from "@/clientApi/aws";
import { ITaskPayload } from "@/types/node";



export const uploadAllFiles = async (payload: ITaskPayload) => {
    try {
        await processFiles(payload, payload.modelDetails.modelName);
        console.log('All files processed:', payload);
    } catch (error) {
        console.error('Failed to process files:', error);
    }
};


export async function uploadFileToS3(file: File, path: string): Promise<string> {
    console.log('Uploading file to S3:', file, path);
    const fileType = file.type || 'application/octet-stream';

    const url = await generatePredefinedUrl({ fileName: path, fileType });
    await uploadToAwsUsingPredefinedUrl(url, file);
    return url.split('?')[0];
}


async function processFiles(obj: any, path: string): Promise<void> {
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (value instanceof FileList && value.length > 0) {
            const file = value[0]; // assuming only one file per FileList for simplicity
            const s3Path = `aimodels/${path}/${file.name}`;
            const url = await uploadFileToS3(file, s3Path);
            const urlKey = `${key.replace('File', 'Url')}`; // Transform 'pretrainedModelFile' into 'pretrainedModelUrl'
            obj[urlKey] = url;
        } else if (typeof value === 'object' && value !== null) {
            await processFiles(value, path); // Recursive call for nested objects
        }
    }
}