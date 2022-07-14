import { ColumnDefinition } from 'react-tabulator';

import { updateStatus } from './plan.service';
import * as columns from './plan-item.columns';

export enum PlanStatus {
    DRAFT = 'draft',
    FORECAST = 'forecast',
    INVENTORY = 'inventory',
    REVIEW = 'review',
}

export type PlanConfig = {
    label: string;
    color: string;
    action: {
        label: string;
        handler: (id: number) => Promise<any>;
    };
    columns: ColumnDefinition[];
};

export const planConfigs: { [status in PlanStatus]: PlanConfig } = {
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
            columns.withEditor(columns.vendorName),
            columns.withEditor(columns.vendorAllocation),
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
            columns.withEditor(columns.vendorName),
            columns.withEditor(columns.vendorAllocation),
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
