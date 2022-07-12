export type Item = {
    sku: string;
    name: string;
}

export type PlanItemVendor = {
    vendor: {
        name: string;
    }
    allocation: number
}

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
    vendors: PlanItemVendor[]
};
