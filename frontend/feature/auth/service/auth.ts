import getApiClient, { apiRequest } from '../../../lib/api';

const client = getApiClient('auth');

export const request = apiRequest(client);

export type Token = {
    token: string;
};

export type User = {
    id: number;
    email: string;
    feature: string[];
};

export const authenticate = (data: Token) =>
    request({ url: 'google', method: 'POST', data });
