import { updateStatus } from './plan.api';
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
        label?: string;
        handler: (id: number) => Promise<any>;
    };
    columns: {
        root: columns.ColumnFactory[];
        vendors: columns.ColumnFactory[];
    };
};

export const planConfigs: { [status in PlanStatus]: PlanConfig } = {
    draft: {
        label: 'Draft',
        color: 'teal.400',
        action: {
            label: 'Forecast',
            handler: updateStatus('forecast'),
        },
        columns: {
            root: [
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
            vendors: [
                columns.vendorName,
                columns.withEditor(columns.vendorAllocation),
            ],
        },
    },
    forecast: {
        label: 'Forecast',
        color: 'cyan.500',
        action: {
            label: 'Inventory',
            handler: updateStatus('inventory'),
        },
        columns: {
            root: [
                columns.sku,
                columns.startOfWeek,
                columns.region,
                columns.weekNo,
                columns.year,
                columns.percentageChange1w,
                columns.percentageChange1m,
                columns.percentageChange3m,
                columns.qtyDemandML,
                columns.withEditor(columns.qtyDemandPurchasing),
            ],
            vendors: [],
        },
    },
    inventory: {
        label: 'Inventory',
        color: 'blue.500',
        action: {
            label: 'Review',
            handler: updateStatus('review'),
        },
        columns: {
            root: [
                columns.sku,
                columns.startOfWeek,
                columns.region,
                columns.weekNo,
                columns.year,
            ],
            vendors: [
                columns.vendorName,
                columns.withEditor(columns.vendorAllocation),
            ],
        },
    },
    review: {
        label: 'Review',
        color: 'purple.500',
        action: {
            handler: updateStatus('review'),
        },
        columns: {
            root: [
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
            vendors: [],
        },
    },
};
