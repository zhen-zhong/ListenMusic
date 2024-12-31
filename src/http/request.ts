import axios, { AxiosResponse, CancelTokenSource } from 'axios';

const instance = axios.create({
    baseURL: '',
    timeout: 60000,
    headers: { 
        'Content-Type': 'application/json',
    },
});

const cancelSources: { [key: string]: CancelTokenSource } = {};

instance.interceptors.request.use(
    (config) => {
        const requestKey = `${config.method}-${config.url}-${JSON.stringify(config.params)}-${JSON.stringify(config.data)}`;

        if (cancelSources[requestKey]) {
            cancelSources[requestKey].cancel('Operation canceled due to new request.');
        }

        cancelSources[requestKey] = axios.CancelToken.source();

        config.cancelToken = cancelSources[requestKey].token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response;
        if (data.code === 20000) return data;
        return Promise.reject(new Error(data.message));
    },
    (error) => {
        if (axios.isCancel(error)) {
            console.log('Request canceled: ', error.message);
            return Promise.resolve({ canceled: true });
        }

        const { data } = error.response;
        if (data.code === 40100) {
            return Promise.reject(error);
        }
        if (error.status === 502 || error.status === 500) {
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export const cancelRequest = (requestKey: string) => {
    if (cancelSources[requestKey]) {
        cancelSources[requestKey].cancel('Request canceled by user.');
        delete cancelSources[requestKey];
    }
};

export default instance;
