import { request } from './api';

export type PlanItem = {
    id: number;
    startOfWeek: Date;
    weekNo: number;
    year: number;
    region: string;
    seed: {
        avgItemDiscount: number;
        avgOrderDiscount: number;
        basePrice: number;
        workingDays: number;
    };
    forecast: {
        percentageChange1w: number;
        percentageChange1m: number;
        percentageChange3m: number;
        qtyDemandML: number;
        qtyDemandPurchasing: number;
    };

    item: {
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
