import getApiClient, { apiRequest } from '../../../lib/api';

const client = getApiClient('demand-planning')

export const request = apiRequest(client);
