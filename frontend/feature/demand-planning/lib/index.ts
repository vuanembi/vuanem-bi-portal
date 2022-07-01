import getApiClient from '../../../lib/api';

export const apiClient = getApiClient('demand-planning');

export type PlanStatusStyle = {
    label: string;
    color: string;
};

export const planStatusStyles: { [status: string]: PlanStatusStyle } = {
    draft: {
        label: 'Draft',
        color: 'teal.300',
    },
    forecasted: {
        label: 'Forecasted',
        color: 'blue.300',
    },
    reviewed: {
        label: 'Reviewed',
        color: 'purple.300',
    },
};
