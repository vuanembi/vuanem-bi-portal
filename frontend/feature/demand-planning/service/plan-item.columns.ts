import { ColumnDefinition } from 'react-tabulator';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const withEditor = (column: ColumnDefinition): ColumnDefinition => ({
    ...column,
    editor: 'number',
    cssClass: 'tabulator-editable',
});

export const sku: ColumnDefinition = {
    title: 'SKU',
    field: 'item.sku',
    frozen: true,
};

export const startOfWeek: ColumnDefinition = {
    title: 'Start of Week',
    field: 'startOfWeek',
    formatter: (cell) => {
        const date = cell.getValue();
        return date ? dayjs.utc(date).format('YYYY-MM-DD') : '';
    },
    frozen: true,
};

export const weekNo: ColumnDefinition = {
    title: 'Week',
    field: 'weekNo',
    hozAlign: 'right',
};

export const year: ColumnDefinition = {
    title: 'Year',
    field: 'year',
    hozAlign: 'right',
};

export const region: ColumnDefinition = {
    title: 'Region',
    field: 'region',
    frozen: true,
};

export const avgItemDiscount: ColumnDefinition = {
    title: 'Avg. Item Discount',
    field: 'seed.avgItemDiscount',
    hozAlign: 'right',
    cellEdited: (cell) => {
        console.log(123);
        console.log({cell});
    }
};

export const avgOrderDiscount: ColumnDefinition = {
    title: 'Avg. Order Discount',
    field: 'seed.avgOrderDiscount',
    hozAlign: 'right',
};

export const basePrice: ColumnDefinition = {
    title: 'Base Price',
    field: 'seed.basePrice',
    hozAlign: 'right',
};

export const workingDays: ColumnDefinition = {
    title: 'Working Days',
    field: 'seed.workingDays',
    hozAlign: 'right',
};

export const qtyDemandML: ColumnDefinition = {
    title: 'Qty. Demand ML',
    field: 'seed.qtyDemandML',
    hozAlign: 'right',
};

export const qtyDemandPurchasing: ColumnDefinition = {
    title: 'Qty. Demand Pur',
    field: 'seed.qtyDemandPurchasing',
    hozAlign: 'right',
};

export const vendorName: ColumnDefinition = {
    title: 'Vendor Name',
    field: 'vendor.name',
    hozAlign: 'left',
    cellEdited: (zx) => {
        console.log(123);
        console.log(zx);
    }
};

export const vendorAllocation: ColumnDefinition = {
    title: 'Vendor Allocation',
    field: 'allocation',
    hozAlign: 'right',
    cellEdited: (cell) => {
        console.log(123);
        console.log({cell});
    }
};
