import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlanItemDto {
    @ApiProperty()
    startOfWeek: Date;

    @ApiProperty()
    region: string;

    @ApiProperty()
    avgItemDiscount: number;

    @ApiProperty()
    avgOrderDiscount: number;

    @ApiProperty()
    basePrice: number;

    @ApiProperty()
    workingDays: number;
}

export class GetPlanItemsDto {
    @ApiProperty()
    planId: number;
}

export class UpdatePlanItemDto {
    @ApiPropertyOptional()
    sku?: string;

    @ApiPropertyOptional()
    startOfWeek?: Date;

    @ApiPropertyOptional()
    region?: string;

    @ApiPropertyOptional()
    avgItemDiscount?: number;

    @ApiPropertyOptional()
    avgOrderDiscount?: number;

    @ApiPropertyOptional()
    discount?: number;

    @ApiPropertyOptional()
    workingDays?: number;

    @ApiPropertyOptional()
    inventory?: number;

    @ApiPropertyOptional()
    moq?: number;

    @ApiPropertyOptional()
    leadTime?: number;

    @ApiPropertyOptional()
    qtyDemandML?: number | null;

    @ApiPropertyOptional()
    qtyDemandPurchasing?: number | null;

    @ApiPropertyOptional()
    qtyDemand?: number | null;

    @ApiPropertyOptional()
    qtySupply?: number | null;
}
