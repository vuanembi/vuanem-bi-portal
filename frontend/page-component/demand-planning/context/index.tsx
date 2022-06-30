import { createContext } from 'react';

import getApiClient from '../../../lib/api';

export const apiClient = getApiClient('demand-planning');

export const ApiContext = createContext(apiClient);
