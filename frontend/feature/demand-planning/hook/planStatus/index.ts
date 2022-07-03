import type { Column } from 'react-table';

import type { PlanItem } from '../../type';
import columns from './columns';

export type PlanStatusStyle = {
    label: string;
    color: string;
    action?: {
        label: string;
        handler: () => void;
    };
    columns: Column<PlanItem>[];
};

export const planStatuses: { [status: string]: PlanStatusStyle } = {
    draft: {
        label: 'Draft',
        color: 'teal.300',
        action: {
            label: 'Forecast',
            handler: () => {
                console.log('forecast');
            },
        },
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.avgItemDiscount,
            columns.avgOrderDiscount,
            columns.discount,
            columns.workingDays,
            columns.inventory,
            columns.moq,
            columns.leadTime,
        ],
    },
    forecasted: {
        label: 'Forecasted',
        color: 'blue.300',
        action: {
            label: 'Review',
            handler: () => {
                console.log('review');
            },
        },
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.avgItemDiscount,
            columns.avgOrderDiscount,
            columns.discount,
            columns.workingDays,
            columns.inventory,
            columns.moq,
            columns.leadTime,
        ],
    },
    reviewed: {
        label: 'Reviewed',
        color: 'purple.300',
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.avgItemDiscount,
            columns.avgOrderDiscount,
            columns.discount,
            columns.workingDays,
            columns.inventory,
            columns.moq,
            columns.leadTime,
        ],
    },
};

const usePlanStatus = (status: string): PlanStatusStyle => planStatuses[status];

export default usePlanStatus;
