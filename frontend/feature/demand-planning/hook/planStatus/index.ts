import { ColumnDefinition } from 'react-tabulator';

import { updateStatus } from '../../service/plan';
import * as columns from './columns';

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
            columns.region,
            columns.weekNo,
            columns.year,
            columns.withEditor(columns.avgItemDiscount),
            columns.withEditor(columns.avgOrderDiscount),
            columns.withEditor(columns.basePrice),
            columns.withEditor(columns.workingDays),
        ],
    },
    forecast: {
        label: 'Forecast',
        color: 'blue.300',
        action: {
            label: 'Inventory',
            handler: updateStatus('inventory'),
        },
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.region,
            columns.weekNo,
            columns.year,
            columns.avgItemDiscount,
            columns.avgOrderDiscount,
            columns.basePrice,
            columns.workingDays,
            columns.qtyDemandML,
            columns.withEditor(columns.qtyDemandPurchasing),
        ],
    },
    inventory: {
        label: 'Review',
        color: 'blue.300',
        action: {
            label: 'Review',
            handler: updateStatus('review'),
        },
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.region,
            columns.weekNo,
            columns.year,
            columns.avgItemDiscount,
            columns.avgOrderDiscount,
            columns.basePrice,
            columns.workingDays,
            columns.qtyDemandML,
            columns.qtyDemandPurchasing,
            columns.vendorName,
            columns.vendorAllocation,
        ],
    },
    review: {
        label: 'Reviewed',
        color: 'purple.300',
        action: {
            label: 'Review',
            handler: updateStatus('review'),
        },
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.region,
            columns.weekNo,
            columns.year,
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
