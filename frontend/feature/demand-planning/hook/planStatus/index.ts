import { updateStatus } from '../../service/plan';
import * as columns from './columns';

import {
    DisplayCell,
    EditableCell,
} from '../../component/PlanDetails/Workbench/Cell';

export type PlanStatusStyle = {
    label: string;
    color: string;
    action: {
        label: string;
        handler: (id: number) => Promise<any>;
    };
    columns: columns.ColumnDef[];
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
            columns.expander,
            columns.sku,
            columns.region,
            columns.startOfWeek,
            columns.weekNo,
            columns.year,
            {...columns.avgItemDiscount, Cell: EditableCell},
            {...columns.avgOrderDiscount, Cell: EditableCell},
            {...columns.basePrice, Cell: EditableCell},
            {...columns.workingDays, Cell: EditableCell},
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
            columns.expander,
            columns.sku,
            columns.region,
            columns.startOfWeek,
            columns.weekNo,
            columns.year,
            {...columns.avgItemDiscount, Cell: DisplayCell},
            {...columns.avgOrderDiscount, Cell: DisplayCell},
            {...columns.basePrice, Cell: DisplayCell},
            {...columns.workingDays, Cell: DisplayCell},
            {...columns.qtyDemandML, Cell: DisplayCell},
            {...columns.qtyDemandPurchasing, Cell: EditableCell},
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
            columns.expander,
            columns.sku,
            columns.region,
            columns.startOfWeek,
            columns.weekNo,
            columns.year,
            {...columns.avgItemDiscount, Cell: DisplayCell},
            {...columns.avgOrderDiscount, Cell: DisplayCell},
            {...columns.basePrice, Cell: DisplayCell},
            {...columns.workingDays, Cell: DisplayCell},
            {...columns.qtyDemandML, Cell: DisplayCell},
            {...columns.qtyDemandPurchasing, Cell: DisplayCell},
        ],
    },
};

const usePlanStatus = (status: string): PlanStatusStyle => planStatuses[status];

export default usePlanStatus;
