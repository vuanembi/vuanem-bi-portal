import { AxiosRequestConfig } from 'axios';

import getApiClient from '../../lib/api';

const apiClient = getApiClient('netsuite');

export const request = <T>(config: AxiosRequestConfig) =>
    apiClient.request<T>(config).then(({ data }) => data);
