import { ColumnDefinition } from 'react-tabulator';

import { updateStatus } from '../../service/plan';
import columns from './columns';

export type PlanStatusStyle = {
    label: string;
    color: string;
    action: {
        label: string;
        handler: (id: number) => Promise<any>;
    };
    columns: ColumnDefinition[];
};

export const planStatuses: { [status: string]: PlanStatusStyle } = {
    draft: {
        label: 'Draft',
        color: 'teal.300',
        action: {
            label: 'Forecast',
            handler: updateStatus('forecast'),
        },
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.weekNo,
            columns.year,
            columns.region,
            columns.avgItemDiscount,
            columns.avgOrderDiscount,
            columns.basePrice,
            columns.workingDays,
            columns.qtyDemandML,
            columns.qtyDemandPurchasing,
        ],
    },
    forecasted: {
        label: 'Forecasted',
        color: 'blue.300',
        action: {
            label: 'Review',
            handler: updateStatus('review'),
        },
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.weekNo,
            columns.year,
            columns.region,
            columns.avgItemDiscount,
            columns.avgOrderDiscount,
            columns.basePrice,
            columns.workingDays,
            columns.qtyDemandML,
            columns.qtyDemandPurchasing,
        ],
    },
    reviewed: {
        label: 'Reviewed',
        color: 'purple.300',
        action: {
            label: 'Review',
            handler: updateStatus('review'),
        },
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.weekNo,
            columns.year,
            columns.region,
            columns.avgItemDiscount,
            columns.avgOrderDiscount,
            columns.basePrice,
            columns.workingDays,
            columns.qtyDemandML,
            columns.qtyDemandPurchasing,
        ],
    },
};

const usePlanStatus = (status: string): PlanStatusStyle => planStatuses[status];

export default usePlanStatus;
