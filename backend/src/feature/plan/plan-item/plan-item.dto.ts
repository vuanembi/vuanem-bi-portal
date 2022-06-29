export class CreateDto {
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
}

export class GetDto {
    sku: string;
    region: string;
}

export class UpdateDto {
    sku?: string;
    startOfWeek?: Date;
    region?: string;
    avgItemDiscount?: number;
    avgOrderDiscount?: number;
    discount?: number;
    workingDays?: number;
    inventory?: number;
    moq?: number;
    leadTime?: number;
    qtyDemandML?: number | null;
    qtyDemandPurchasing?: number | null;
    qtyDemand?: number | null;
    qtySupply?: number | null;
}
