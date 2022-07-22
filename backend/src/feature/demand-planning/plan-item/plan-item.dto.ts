import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlanItemDto {
    classId: number;

    productGroupCode: string;

    width: number;

    length: number;

    thickness: number;

    region: string;

    startOfWeek: Date;

    avgItemDiscount: number;

    avgOrderDiscount: number;

    basePrice: number;

    workingDays: number;

    qtyL1w: number;

    qtyL4w: number;

    qtyL8w: number;

    seedingInventory: number;

    qtyBackOrder: number;

    qtyCommitted: number;

    qtyOnOrder: number;

    safetyStockLevelInDays: number;

    vendorIds: number[];
}

class UpdatePlanItemSeedDto {
    @ApiPropertyOptional()
    avgItemDiscount: number;

    @ApiPropertyOptional()
    avgOrderDiscount: number;

    @ApiPropertyOptional()
    basePrice: number;

    @ApiPropertyOptional()
    workingDays: number;
}

class UpdatePlanItemForecastDto {
    @ApiPropertyOptional()
    qtyDemandPurchasing?: number;
}

export class UpdatePlanItemDto {
    // Seed

    @ApiPropertyOptional()
    avgItemDiscount: number;

    @ApiPropertyOptional()
    avgOrderDiscount: number;

    @ApiPropertyOptional()
    basePrice: number;

    @ApiPropertyOptional()
    workingDays: number;

    // Forecast
    
    @ApiPropertyOptional()
    qtyDemandPurchasing: number;
}
