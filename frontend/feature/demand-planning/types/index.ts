export type Plan = {
    id: number;
    name: string;
    startOfForecastWeek: string;
    status: string;
    vendor: {
        name: string;
    }
    createdAt: string;
    updatedAt: string;
};

export type PlanItem = {
    id: number;
    planId: number;
    sku: string;
    startOfWeek: Date;
    region: string;
    avgItemDiscount: number;
    avgOrderDiscount: number;
    discount: number;
    workingDays: number;
    inventory: number;
    moq: number;
    leadTime: number;
    qtyDemandML: number | null;
    qtyDemandPurchasing: number | null;
    qtyDemand: number | null;
    qtySupply: number | null;
};
