import getApiClient, { apiRequest } from '../../../lib/api';

const client = getApiClient('user');

export const request = apiRequest(client);

export type Token = {
    token: string;
};

export type User = {
    id: number;
    email: string;
    feature: string[];
};

export const getOne = (id: number) => request({ url: `${id}`, method: 'GET' });
