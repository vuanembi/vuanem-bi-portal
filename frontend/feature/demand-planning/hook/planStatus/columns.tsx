import type { Column } from 'react-table';

import { Regular, Date } from '../../component/PlanDetails/Workbench/Cell';

import type { PlanItem } from '../../type';

type ColumnOptions = Column<PlanItem> & { isNumeric?: boolean };

const columns: { [accessor: string]: ColumnOptions } = {
    sku: { Header: 'SKU', accessor: 'sku', Cell: Regular },
    startOfWeek: {
        Header: 'Start of Week',
        accessor: 'startOfWeek',
        Cell: Date,
    },
    region: {
        Header: 'Region',
        accessor: 'region',
        Cell: Regular,
    },
    avgItemDiscount: {
        Header: 'Avg. Item Discount',
        accessor: 'avgItemDiscount',
        isNumeric: true,
    },
    avgOrderDiscount: {
        Header: 'Avg. Order Discount',
        accessor: 'avgOrderDiscount',
        isNumeric: true,
    },
    discount: {
        Header: 'Discount',
        accessor: 'discount',
        isNumeric: true,
    },
    workingDays: {
        Header: 'Working Days',
        accessor: 'workingDays',
        isNumeric: true,
    },
    inventory: {
        Header: 'Inventory',
        accessor: 'inventory',
        isNumeric: true,
    },
    moq: {
        Header: 'MOQ',
        accessor: 'moq',
        isNumeric: true,
    },
    leadTime: {
        Header: 'Lead Time',
        accessor: 'leadTime',
        isNumeric: true,
    },
    qtyDemandML: {
        Header: 'Qty. Demand ML',
        accessor: 'qtyDemandML',
        isNumeric: true,
        Cell: Regular,
    },
    qtyDemandPurchasing: {
        Header: 'Qty. Demand Purchasing',
        accessor: 'qtyDemandPurchasing',
        isNumeric: true,
    },
    qtyDemand: {
        Header: 'Qty. Demand',
        accessor: 'qtyDemand',
        isNumeric: true,
    },
    qtySupply: {
        Header: 'Qty. Supply',
        accessor: 'qtySupply',
        isNumeric: true,
    },
};

export default columns;
