import { request } from './api';

export type PlanItem = {
    id: number;
    startOfWeek: Date;
    weekNo: number;
    year: number;
    region: string;

    avgItemDiscount: number;
    avgOrderDiscount: number;
    basePrice: number;
    workingDays: number;

    percentageChangeL1w: number;
    percentageChangeL4w: number;
    percentageChangeL8w: number;
    qtyDemandML: number;
    qtyDemandPurchasing: number;

    seedingInventory: number;
    qtyBackOrder: number;
    qtyCommitted: number;
    qtyOnOrder: number;
    safetyStockLevelInDays: number;
    
    class: {
        sku: string;
        name: string;
    };
    vendors: {
        vendor: {
            name: string;
        };
        allocation: number;
    }[];
};

export const getOne = (id: number) => () =>
    request({ url: `/plan-item/${id}` });

export const updateOne = (data: PlanItem) =>
    request({ url: `/plan-item/${data.id}`, data, method: 'PUT' });
