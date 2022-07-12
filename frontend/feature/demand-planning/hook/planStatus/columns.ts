import { ColumnDefinition } from 'react-tabulator';

const startOfWeek = { title: 'Start of Week', field: 'startOfWeek' };

const weekNo = { title: 'Week', field: 'weekNo' };

const year = { title: 'Year', field: 'year' };

const region = { title: 'Region', field: 'region' };

const avgItemDiscount = {
    title: 'Avg. Item Discount',
    field: 'avgItemDiscount',
};

const avgOrderDiscount = {
    title: 'Avg. Order Discount',
    field: 'avgOrderDiscount',
};

const basePrice = { title: 'Base Price', field: 'basePrice' };

const workingDays = { title: 'Working Days', field: 'workingDays' };

const qtyDemandML = { title: 'Qty. Demand ML', field: 'qtyDemandML' };

const qtyDemandPurchasing = {
    title: 'Qty. Demand Pur',
    field: 'qtyDemandPurchasing',
};

const sku = { title: 'SKU', field: 'item.sku' };

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
