import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Column } from 'react-table';

import { ExpandableHeader } from '../../component/PlanDetails/Workbench/Header';
import {
    DisplayCell,
    EditableCell,
    ExpandableCell,
} from '../../component/PlanDetails/Workbench/Cell';
import { PlanItem, PlanItemGroup } from '../../service/plan-item';

dayjs.extend(utc);

export type ColumnDef = Column<PlanItemGroup>;

const formatters = {
    text: (value: any) => value,
    date: (value: Date) => dayjs.utc(value).format('YYYY-MM-DD'),
};

export const expander: ColumnDef = {
    id: 'expander',
    Header: ExpandableHeader,
    width: 100,
    Cell: ExpandableCell,
    formatter: formatters.text,
    sticky: 'left',
};

export const sku: ColumnDef = {
    id: 'sku',
    Header: 'SKU',
    accessor: (planItem: PlanItemGroup) => planItem.sku,
    width: 150,
    Cell: DisplayCell,
    formatter: formatters.text,
    sticky: 'left',
};

export const startOfWeek: ColumnDef = {
    Header: 'Start of Week',
    accessor: (planItem: PlanItem) => planItem.startOfWeek,
    width: 150,
    Cell: DisplayCell,
    formatter: formatters.date,
    sticky: 'left',
};

export const region: ColumnDef = {
    id: 'region',
    Header: 'Region',
    accessor: (planItem: PlanItem) => planItem.region,
    width: 100,
    Cell: DisplayCell,
    formatter: formatters.text,
    sticky: 'left',
};

export const weekNo: ColumnDef = {
    Header: 'Week',
    accessor: (planItem: PlanItem) => planItem.weekNo,
    width: 80,
    Cell: DisplayCell,
    formatter: formatters.text,
};

export const year: ColumnDef = {
    Header: 'Year',
    accessor: (planItem: PlanItem) => planItem.startOfWeek,
    width: 80,
    formatter: formatters.text,
};

export const avgItemDiscount: ColumnDef = {
    Header: 'Avg. Item Discount',
    accessor: (planItem: PlanItem) => planItem.avgItemDiscount,
    width: 160,
    formatter: formatters.text,
    isNumeric: true,
};

export const avgOrderDiscount: ColumnDef = {
    Header: 'Avg. Order Discount',
    accessor: (planItem: PlanItem) => planItem.avgOrderDiscount,
    width: 170,
    formatter: formatters.text,
    isNumeric: true,
};

export const basePrice: ColumnDef = {
    Header: 'Base Price',
    accessor: (planItem: PlanItem) => planItem.basePrice,
    isNumeric: true,
    formatter: formatters.text,
};

export const workingDays: ColumnDef = {
    Header: 'Working Days',
    accessor: (planItem: PlanItem) => planItem.workingDays,
    Cell: EditableCell,
    isNumeric: true,
    formatter: formatters.text,
};

export const qtyDemandML: ColumnDef = {
    Header: 'Qty. Demand ML',
    accessor: (planItem: PlanItem) => planItem.qtyDemandML,
    isNumeric: true,
    formatter: formatters.text,
};

export const qtyDemandPurchasing: ColumnDef = {
    Header: 'Qty. Demand Purchasing',
    accessor: (planItem: PlanItem) => planItem.qtyDemandPurchasing,
    width: 200,
    formatter: formatters.text,
    isNumeric: true,
};
