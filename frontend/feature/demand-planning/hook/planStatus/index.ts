import type { Column } from 'react-table';

import {
    Regular,
    Date,
    EditNumber,
} from '../../component/PlanDetails/Workbench/Cell';

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
            columns.region,
            {...columns.avgItemDiscount, Cell: EditNumber},
            {...columns.avgOrderDiscount, Cell: EditNumber},
            {...columns.discount, Cell: EditNumber},
            {...columns.workingDays, Cell: EditNumber},
            {...columns.inventory, Cell: EditNumber},
            {...columns.moq, Cell: EditNumber},
            {...columns.leadTime, Cell: EditNumber},
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
            columns.region,
            {...columns.avgItemDiscount, Cell: Regular},
            {...columns.avgOrderDiscount, Cell: Regular},
            {...columns.discount, Cell: Regular},
            {...columns.workingDays, Cell: Regular},
            {...columns.inventory, Cell: Regular},
            {...columns.moq, Cell: Regular},
            {...columns.leadTime, Cell: Regular},
            columns.qtyDemandML,
            {...columns.qtyDemandPurchasing, Cell: EditNumber},
            {...columns.qtyDemand, Cell: EditNumber},
            {...columns.qtySupply, Cell: EditNumber},
        ],
    },
    reviewed: {
        label: 'Reviewed',
        color: 'purple.300',
        columns: [
            columns.sku,
            columns.startOfWeek,
            columns.region,
            {...columns.avgItemDiscount, Cell: Regular},
            {...columns.avgOrderDiscount, Cell: Regular},
            {...columns.discount, Cell: Regular},
            {...columns.workingDays, Cell: Regular},
            {...columns.inventory, Cell: Regular},
            {...columns.moq, Cell: Regular},
            {...columns.leadTime, Cell: Regular},
            {...columns.qtyDemandML, Cell: Regular},
            {...columns.qtyDemandPurchasing, Cell: EditNumber},
            {...columns.qtyDemand, Cell: EditNumber},
            {...columns.qtySupply, Cell: EditNumber},
        ],
    },
};

const usePlanStatus = (status: string): PlanStatusStyle => planStatuses[status];

export default usePlanStatus;
