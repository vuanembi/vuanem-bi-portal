import { ColumnDef } from '@tanstack/react-table';

import DisplayCell from '../../component/PlanDetails/Workbench/Cell/DisplayCell';
import EditableNumberCell from '../../component/PlanDetails/Workbench/Cell/EditableNumberCell';

import { apiClient } from '../../lib';

import columns from './columns';
import type { PlanItem, PlanItemGroup } from '../../types';
import { AxiosResponse } from 'axios';

export type PlanStatusStyle = {
    label: string;
    color: string;
    action?: {
        label: string;
        handler: (id: PlanItem['id']) => Promise<AxiosResponse>;
    };
    columns: ColumnDef<PlanItemGroup>[];
};

const handlePlanStatusUpdate = (endpoint: string) => (id: PlanItem['id']) =>
    apiClient.put(`/plan/${id}/${endpoint}`);

export const planStatuses: { [status: string]: PlanStatusStyle } = {
    draft: {
        label: 'Draft',
        color: 'teal.300',
        action: {
            label: 'Forecast',
            handler: handlePlanStatusUpdate('forecast'),
        },
        columns: [
            columns.expander,
            columns.sku,
            columns.region,
            columns.startOfWeek,
            { ...columns.avgItemDiscount, cell: EditableNumberCell },
            { ...columns.avgOrderDiscount, cell: EditableNumberCell },
            { ...columns.discount, cell: EditableNumberCell },
            { ...columns.workingDays, cell: EditableNumberCell },
            { ...columns.inventory, cell: EditableNumberCell },
            { ...columns.moq, cell: EditableNumberCell },
            { ...columns.leadTime, cell: EditableNumberCell },
        ],
    },
    forecasted: {
        label: 'Forecasted',
        color: 'blue.300',
        action: {
            label: 'Review',
            handler: handlePlanStatusUpdate('review'),
        },
        columns: [
            columns.expander,
            columns.sku,
            columns.region,
            columns.startOfWeek,
            { ...columns.avgItemDiscount, cell: DisplayCell },
            { ...columns.avgOrderDiscount, cell: DisplayCell },
            { ...columns.discount, cell: DisplayCell },
            { ...columns.workingDays, cell: DisplayCell },
            { ...columns.inventory, cell: DisplayCell },
            { ...columns.moq, cell: DisplayCell },
            { ...columns.leadTime, cell: DisplayCell },
            columns.qtyDemandML,
            { ...columns.qtyDemandPurchasing, cell: EditableNumberCell },
            { ...columns.qtyDemand, cell: EditableNumberCell },
            { ...columns.qtySupply, cell: EditableNumberCell },
        ],
    },
    reviewed: {
        label: 'Reviewed',
        color: 'purple.300',
        columns: [
            columns.expander,
            columns.sku,
            columns.region,
            columns.startOfWeek,
            { ...columns.avgItemDiscount, cell: DisplayCell },
            { ...columns.avgOrderDiscount, cell: DisplayCell },
            { ...columns.discount, cell: DisplayCell },
            { ...columns.workingDays, cell: DisplayCell },
            { ...columns.inventory, cell: DisplayCell },
            { ...columns.moq, cell: DisplayCell },
            { ...columns.leadTime, cell: DisplayCell },
            { ...columns.qtyDemandML, cell: DisplayCell },
            { ...columns.qtyDemandPurchasing, cell: DisplayCell },
            { ...columns.qtyDemand, cell: DisplayCell },
            { ...columns.qtySupply, cell: DisplayCell },
        ],
    },
};

const usePlanStatus = (status: string): PlanStatusStyle => planStatuses[status];

export default usePlanStatus;
