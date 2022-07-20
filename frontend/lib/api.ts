import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const getApiClient = (module: string) => {
    const baseURL = [
        process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
        module,
    ].join('/');
    return axios.create({ baseURL });
};

export const apiRequest =
    (apiClient: AxiosInstance) =>
    <T>(config: AxiosRequestConfig) =>
        apiClient.request<T>(config).then(({ data }) => data);

export default getApiClient;
