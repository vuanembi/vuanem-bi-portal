export type Plan = {
    id: number;
    name: string;
    startOfForecastWeek: string;
    status: string;
    vendor: {
        name: string;
    };
    createdAt: string;
    updatedAt: string;
};

export type PlanItem = {
    id: number;
    planId: number;
    sku: string;
    region: string;
    startOfWeek: Date;
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
    subRows: PlanItem[];
};

export type PlanItemGroup = Partial<PlanItem> & {
    subRows: (Partial<PlanItem> & {
        subRows: PlanItem[];
    })[];
};
