import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Column } from 'react-table';

import { DisplayCell, EditableCell } from '../../component/PlanDetails/Workbench/Cell';
import { PlanItem } from '../../service/plan-item';

dayjs.extend(utc);

export type ColumnDef = Column<PlanItem>;

const formatters = {
    text: (value: any) => value,
    date: (value: Date) => dayjs.utc(value).format('YYYY-MM-DD'),
};

export const sku: ColumnDef = {
    Header: 'SKU',
    accessor: (planItem) => planItem.item.sku,
    width: 150,
    Cell: DisplayCell,
    formatter: formatters.text,
    sticky: 'left'
}

export const startOfWeek: ColumnDef = {
    Header: 'Start of Week',
    accessor: 'startOfWeek',
    width: 150,
    Cell: DisplayCell,
    formatter: formatters.date,
    sticky: 'left',
};

export const weekNo: ColumnDef = {
    Header: 'Week',
    accessor: 'weekNo',
    width: 80,
    Cell: DisplayCell,
    formatter: formatters.text,
};

export const year: ColumnDef = {
    Header: 'Year',
    accessor: 'year',
    width: 80,
    Cell: DisplayCell,
    formatter: formatters.text,
};

export const region: ColumnDef = {
    Header: 'Region',
    accessor: 'region',
    width: 100,
    Cell: DisplayCell,
    formatter: formatters.text,
    sticky: 'left',
};

export const avgItemDiscount: ColumnDef = {
    Header: 'Avg. Item Discount',
    accessor: 'avgItemDiscount',
    width: 160,
    Cell: EditableCell,
    formatter: formatters.text,
    isNumeric: true,
};

export const avgOrderDiscount: ColumnDef = {
    Header: 'Avg. Order Discount',
    accessor: 'avgOrderDiscount',
    width: 160,
    Cell: EditableCell,
    formatter: formatters.text,
    isNumeric: true,
};

export const basePrice: ColumnDef = {
    Header: 'Base Price',
    accessor: 'basePrice',
    Cell: EditableCell,
    isNumeric: true,
    formatter: formatters.text,
};

export const workingDays: ColumnDef = {
    Header: 'Working Days',
    accessor: 'workingDays',
    Cell: EditableCell,
    isNumeric: true,
    formatter: formatters.text,
};

export const qtyDemandML: ColumnDef = {
    Header: 'Qty. Demand ML',
    accessor: 'qtyDemandML',
    Cell: DisplayCell,
    isNumeric: true,
    formatter: formatters.text,
};

export const qtyDemandPurchasing: ColumnDef = {
    Header: 'Qty. Demand Purchasing',
    accessor: 'qtyDemandPurchasing',
    width: 200,
    Cell: DisplayCell,
    formatter: formatters.text,
    isNumeric: true,
};
