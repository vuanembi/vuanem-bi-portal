import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlanItemDto {
    @ApiProperty()
    sku: string;

    @ApiProperty()
    startOfWeek: Date;

    @ApiProperty()
    region: string;

    @ApiProperty()
    avgItemDiscount: number;

    @ApiProperty()
    avgOrderDiscount: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    workingDays: number;

    @ApiProperty()
    inventory: number;

    @ApiProperty()
    moq: number;

    @ApiProperty()
    leadTime: number;
}

export class GetPlanItemsDto {
    @ApiPropertyOptional()
    sku?: string;

    @ApiPropertyOptional()
    region?: string;
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
