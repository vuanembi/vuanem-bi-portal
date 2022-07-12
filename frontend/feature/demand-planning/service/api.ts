import { AxiosRequestConfig } from 'axios';

import getApiClient from '../../../lib/api';

const apiClient = getApiClient('demand-planning');

export const request = <T>(config: AxiosRequestConfig) =>
    apiClient.request<T>(config).then(({ data }) => data);
