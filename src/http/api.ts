import { AxiosResponse, AxiosProgressEvent } from 'axios'
import instance from "./request";

import { PromoterRegisterParams, PromoterRegisterResponse } from './types';

export const promoterRegister = (params: PromoterRegisterParams): Promise<AxiosResponse<PromoterRegisterResponse>> => {
    return instance({
        url: `/home/promoter/register`,
        method: 'post',
        data: params,
    });
};
