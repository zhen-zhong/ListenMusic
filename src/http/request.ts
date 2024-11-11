import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://127.0.0.1/api/v1';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000, // 超时时间
    headers: { //请求头
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
    },
});

// 添加请求拦截器
instance.interceptors.request.use(
    response => {
        // response.headers['Authorization'] = config.utils.setCookies('homeToken');
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response;
        if (data.code == 20000) return data;
        return Promise.reject(new Error(data.message));
    },
    (error) => {
        const { data } = error.response;
        if (data.code == 40100) {
            return Promise.reject(error);
        }
        // if (error.status === 500) {
        //     config.utils.useMessage().success(data.message)
        //     return Promise.resolve(data);
        // }
        if (error.status === 502 || error.status === 500) {
            // 处理失败逻辑
            return Promise.reject(error);
        }
        // config.utils.useMessage().error(data.message)
        return Promise.reject(error);
    }
);

export default instance;