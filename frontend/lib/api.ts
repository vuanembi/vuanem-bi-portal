import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const getApiClient = (module: string) => {
    const baseURL = [
        process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
        module,
    ].join('/');

    const client = axios.create({ baseURL, withCredentials: true });

    client.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        return {
            ...config,
            headers: { ...config.headers, token },
        };
    });
    return client;
};

export const apiRequest =
    (apiClient: AxiosInstance) =>
    <T>(config: AxiosRequestConfig) =>
        apiClient.request<T>(config).then(({ data }) => data);

export default getApiClient;
