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

export class GetPlanItems {
    sku: string;
    region: string;
}

export class UpdateDto {
    avgItemDiscount: number;
    avgOrderDiscount: number;
    discount: number;
    workingDays: number;
    inventory: number;
    moq: number;
    leadTime: number;
}
