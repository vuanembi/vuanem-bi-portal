import getApiClient, { apiRequest } from '../../../lib/api';

const client = getApiClient('netsuite');

export const request = apiRequest(client);
