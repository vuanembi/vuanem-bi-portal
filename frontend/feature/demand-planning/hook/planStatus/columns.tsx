import { ColumnDef } from '@tanstack/react-table';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import ExpandableHeader from '../../component/PlanDetails/Workbench/Header/ExpandableHeader';
import DisplayCell from '../../component/PlanDetails/Workbench/Cell/DisplayCell';
import ExpandableCell from '../../component/PlanDetails/Workbench/Cell/ExpandableCell';

import type { PlanItemGroup } from '../../types';

dayjs.extend(utc);

const columns: { [key: string]: ColumnDef<PlanItemGroup> } = {
    expander: {
        id: 'expander',
        header: ExpandableHeader,
        cell: ExpandableCell,
    },
    sku: {
        id: 'sku',
        header: 'SKU',
        accessorKey: 'sku',
        cell: DisplayCell,
        meta: {
            formatter: (v: any) => v,
        },
    },
    region: {
        id: 'region',
        header: 'Region',
        accessorKey: 'region',
        cell: DisplayCell,
        meta: {
            formatter: (v: any) => v,
        },
    },
    startOfWeek: {
        id: 'startOfWeek',
        header: 'Start of Week',
        accessorKey: 'startOfWeek',
        cell: DisplayCell,
        meta: { formatter: (v: Date) => dayjs.utc(v).local().format('YYYY-MM-DD') },
    },
    avgItemDiscount: {
        id: 'avgItemDiscount',
        header: 'Avg. Item Discount',
        accessorKey: 'avgItemDiscount',
        meta: { formatter: (v: any) => v, isNumeric: true },
    },
    avgOrderDiscount: {
        id: 'avgOrderDiscount',
        header: 'Avg. Order Discount',
        accessorKey: 'avgOrderDiscount',
        meta: { formatter: (v: any) => v, isNumeric: true },
    },
    discount: {
        id: 'discount',
        header: 'Discount',
        accessorKey: 'discount',
        meta: { formatter: (v: any) => v, isNumeric: true },
    },
    workingDays: {
        id: 'workingDays',
        header: 'Working Days',
        accessorKey: 'workingDays',
        meta: { formatter: (v: any) => v, isNumeric: true },
    },
    inventory: {
        id: 'inventory',
        header: 'Inventory',
        accessorKey: 'inventory',
        meta: { formatter: (v: any) => v, width: 120, isNumeric: true },
    },
    moq: {
        id: 'moq',
        header: 'MOQ',
        accessorKey: 'moq',
        meta: { formatter: (v: any) => v, width: 120, isNumeric: true },
    },
    leadTime: {
        id: 'leadTime',
        header: 'Lead Time',
        accessorKey: 'leadTime',
        meta: { formatter: (v: any) => v, width: 150, isNumeric: true },
    },
    qtyDemandML: {
        id: 'qtyDemandML',
        header: 'Qty. Demand ML',
        accessorKey: 'qtyDemandML',
        cell: DisplayCell,
        meta: { formatter: (v: any) => v, isNumeric: true },
    },
    qtyDemandPurchasing: {
        id: 'qtyDemandPurchasing',
        accessorKey: 'qtyDemandPurchasing',
        header: 'Qty. Demand Purchasing',
        meta: { formatter: (v: any) => v, isNumeric: true, width: 200 },
    },
    qtyDemand: {
        header: 'Qty. Demand',
        accessorKey: 'qtyDemand',
        meta: { formatter: (v: any) => v, isNumeric: true, width: 100 },
    },
    qtySupply: {
        header: 'Qty. Supply',
        accessorKey: 'qtySupply',
        meta: { formatter: (v: any) => v, isNumeric: true, width: 100 },
    },
};

export default columns;
