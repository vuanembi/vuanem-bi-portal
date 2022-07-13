import { request } from './api';

export type Item = {
    sku: string;
    name: string;
};

export type PlanItemVendor = {
    vendor: {
        name: string;
    };
    allocation: number;
};

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

    qtyDemandML: number | null;
    qtyDemandPurchasing: number | null;

    item: Item;
    vendors: PlanItemVendor[];
};

export type PlanItemGroup = PlanItem & {
    sku: PlanItem['item']['sku'];
    subRows: {
        region: PlanItem['region'];
        subRows: Partial<PlanItem>[];
    }[];
};

export const updateOne = (data: PlanItem) =>
    request({ url: `/plan-item/${data.id}`, data });
