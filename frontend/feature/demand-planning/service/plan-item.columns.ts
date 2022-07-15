import { Tabulator } from 'tabulator-tables';
import ColumnDefinition = Tabulator.ColumnDefinition;
import CellEditEventCallback = Tabulator.CellEditEventCallback;

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type ColumnFactory = (
    cellEdited?: CellEditEventCallback,
) => ColumnDefinition;

export const withEditor =
    (columnFactory: ColumnFactory): ColumnFactory =>
    (cellEdited?) => ({
        ...columnFactory(cellEdited),
        editor: 'number',
    });

export const sku: ColumnFactory = () => ({
    title: 'SKU',
    field: 'item.sku',
    frozen: true,
});

export const startOfWeek: ColumnFactory = () => ({
    title: 'Start of Week',
    field: 'startOfWeek',
    formatter: (cell) => {
        const date = cell.getValue();
        return date ? dayjs.utc(date).format('YYYY-MM-DD') : '';
    },
    frozen: true,
});

export const weekNo: ColumnFactory = () => ({
    title: 'Week',
    field: 'weekNo',
    hozAlign: 'right',
});

export const year: ColumnFactory = () => ({
    title: 'Year',
    field: 'year',
    hozAlign: 'right',
});

export const region: ColumnFactory = () => ({
    title: 'Region',
    field: 'region',
    frozen: true,
});

export const avgItemDiscount: ColumnFactory = (cellEdited) => ({
    title: 'Avg. Item Discount',
    field: 'seed.avgItemDiscount',
    hozAlign: 'right',
    cellEdited,
});

export const avgOrderDiscount: ColumnFactory = (cellEdited) => ({
    title: 'Avg. Order Discount',
    field: 'seed.avgOrderDiscount',
    hozAlign: 'right',
    cellEdited,
});

export const basePrice: ColumnFactory = (cellEdited) => ({
    title: 'Base Price',
    field: 'seed.basePrice',
    hozAlign: 'right',
    cellEdited,
});

export const workingDays: ColumnFactory = (cellEdited) => ({
    title: 'Working Days',
    field: 'seed.workingDays',
    hozAlign: 'right',
    cellEdited,
});

export const qtyDemandML: ColumnFactory = () => ({
    title: 'Qty. Demand ML',
    field: 'seed.qtyDemandML',
    hozAlign: 'right',
});

export const qtyDemandPurchasing: ColumnFactory = (cellEdited) => ({
    title: 'Qty. Demand Pur',
    field: 'seed.qtyDemandPurchasing',
    hozAlign: 'right',
    cellEdited,
});

export const vendorName: ColumnFactory = () => ({
    title: 'Vendor Name',
    field: 'vendor.name',
    hozAlign: 'left',
});

export const vendorAllocation: ColumnFactory = (cellEdited) => ({
    title: 'Vendor Allocation',
    field: 'allocation',
    hozAlign: 'right',
    cellEdited,
});
