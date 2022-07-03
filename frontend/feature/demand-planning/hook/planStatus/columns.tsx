import type { Column } from 'react-table';

import {
    DateCell,
    EditableNumberCell,
} from '../../component/PlanDetails/Workbench/Cell';

import type { PlanItem } from '../../type';

type ColumnOptions = Column<PlanItem> & { isNumeric?: boolean };

const columns: { [accessor: string]: ColumnOptions } = {
    sku: { Header: 'SKU', accessor: 'sku' },
    startOfWeek: {
        Header: 'Start of Week',
        accessor: 'startOfWeek',
        Cell: DateCell,
    },
    avgItemDiscount: {
        Header: 'Avg. Item Discount',
        accessor: 'avgItemDiscount',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    avgOrderDiscount: {
        Header: 'Avg. Order Discount',
        accessor: 'avgOrderDiscount',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    discount: {
        Header: 'Discount',
        accessor: 'discount',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    workingDays: {
        Header: 'Working Days',
        accessor: 'workingDays',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    inventory: {
        Header: 'Inventory',
        accessor: 'inventory',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    moq: {
        Header: 'MOQ',
        accessor: 'moq',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    leadTime: {
        Header: 'Lead Time',
        accessor: 'leadTime',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    qtyDemandML: {
        Header: 'Qty. Demand ML',
        accessor: 'qtyDemandML',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    qtyDemandPurchasing: {
        Header: 'Qty. Demand Purchasing',
        accessor: 'qtyDemandPurchasing',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    qtyDemand: {
        Header: 'Qty. Demand',
        accessor: 'qtyDemand',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
    qtySupply: {
        Header: 'Qty. Supply',
        accessor: 'qtySupply',
        isNumeric: true,
        Cell: EditableNumberCell,
    },
};

export default columns;
