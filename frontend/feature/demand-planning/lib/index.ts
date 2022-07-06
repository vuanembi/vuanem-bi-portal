import { groupBy } from 'lodash';

import getApiClient from '../../../lib/api';

export const apiClient = getApiClient('demand-planning');

export const groupByArr = <T>(arr: T[], iter: (v: T) => string) => {
    const group = groupBy(arr, iter);
    return Object.entries(group);
};
