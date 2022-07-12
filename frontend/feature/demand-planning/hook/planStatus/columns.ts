import { ColumnDefinition } from 'react-tabulator';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const startOfWeek: ColumnDefinition = {
    title: 'Start of Week',
    field: 'startOfWeek',
    formatter: (cell) => dayjs.utc(cell.getValue()).format('YYYY-MM-DD'),
    frozen: true,
};

const weekNo = { title: 'Week', field: 'weekNo', hozAlign: 'right' };

const year = { title: 'Year', field: 'year', hozAlign: 'right' };

const region = { title: 'Region', field: 'region', frozen: true };

const avgItemDiscount = {
    title: 'Avg. Item Discount',
    field: 'avgItemDiscount',
    hozAlign: 'right',
};

const avgOrderDiscount = {
    title: 'Avg. Order Discount',
    field: 'avgOrderDiscount',
    hozAlign: 'right',
};

const basePrice = {
    title: 'Base Price',
    field: 'basePrice',
    hozAlign: 'right',
};

const workingDays = {
    title: 'Working Days',
    field: 'workingDays',
    hozAlign: 'right',
};

const qtyDemandML = {
    title: 'Qty. Demand ML',
    field: 'qtyDemandML',
    hozAlign: 'right',
};

const qtyDemandPurchasing = {
    title: 'Qty. Demand Pur',
    field: 'qtyDemandPurchasing',
    hozAlign: 'right',
};

const sku = { title: 'SKU', field: 'item.sku', frozen: true };

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
