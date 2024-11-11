import { AxiosResponse, AxiosProgressEvent } from 'axios'
import instance from "./request";

export const homeUploadFile = <T>(
    params: any = {},
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<AxiosResponse<T>> => {
    return instance({
        url: `/home/uploadFile`,
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (onUploadProgress) {
                onUploadProgress(progressEvent);
            }
        },
    });
};

export const promoterLogin = <T>(params: any = {}): Promise<AxiosResponse<T>> => {
    return instance({
        url: `/home/promoter/login`,
        method: 'post',
        data: params,
    });
};