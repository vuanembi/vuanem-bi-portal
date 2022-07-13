import { ColumnDefinition } from 'react-tabulator';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const startOfWeek: ColumnDefinition = {
    title: 'Start of Week',
    field: 'startOfWeek',
    formatter: (cell) => {
        const date = cell.getValue();
        return date ? dayjs.utc(date).format('YYYY-MM-DD') : '';
    },
    frozen: true,
};

const weekNo: ColumnDefinition = {
    title: 'Week',
    field: 'weekNo',
    hozAlign: 'right',
};

const year: ColumnDefinition = {
    title: 'Year',
    field: 'year',
    hozAlign: 'right',
};

const region: ColumnDefinition = {
    title: 'Region',
    field: 'region',
    frozen: true,
};

const avgItemDiscount = {
    title: 'Avg. Item Discount',
    field: 'avgItemDiscount',
    cssClass: 'tabulator-editable',
    hozAlign: 'right',
    editor: 'number',
};

const avgOrderDiscount: ColumnDefinition = {
    title: 'Avg. Order Discount',
    field: 'avgOrderDiscount',
    cssClass: 'tabulator-editable',
    hozAlign: 'right',
    editor: 'number',
};

const basePrice: ColumnDefinition = {
    title: 'Base Price',
    field: 'basePrice',
    cssClass: 'tabulator-editable',
    hozAlign: 'right',
    editor: 'number',
};

const workingDays: ColumnDefinition = {
    title: 'Working Days',
    field: 'workingDays',
    cssClass: 'tabulator-editable',
    hozAlign: 'right',
    editor: 'number',
};

const qtyDemandML: ColumnDefinition = {
    title: 'Qty. Demand ML',
    field: 'qtyDemandML',
    cssClass: 'tabulator-editable',
    hozAlign: 'right',
};

const qtyDemandPurchasing: ColumnDefinition = {
    title: 'Qty. Demand Pur',
    field: 'qtyDemandPurchasing',
    cssClass: 'tabulator-editable',
    hozAlign: 'right',
};

const sku: ColumnDefinition = { title: 'SKU', field: 'item.sku', frozen: true };

export default {
    startOfWeek,
    weekNo,
    year,
    region,
    avgItemDiscount,
    avgOrderDiscount,
    basePrice,
    workingDays,
    qtyDemandML,
    qtyDemandPurchasing,
    sku,
} as { [key: string]: ColumnDefinition };
