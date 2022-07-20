import getApiClient, { apiRequest } from '../../../lib/api';

const client = getApiClient('user');

export const request = apiRequest(client);

export type User = {
    id: number;
    email: string;
    feature: string[];
};

export const getOne = (id: number) =>
    request<User>({ url: `${id}`, method: 'GET' });
