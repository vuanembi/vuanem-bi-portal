import getApiClient, { apiRequest } from '../../../lib/api';
import { User } from '../../user/service/user.api';

const client = getApiClient('auth');

export const request = apiRequest(client);

export type AuthResponse = {
    user: User;
    token: string;
};

export const authenticate = (token: string) =>
    request<AuthResponse>({ url: 'google', method: 'POST', data: { token } });
