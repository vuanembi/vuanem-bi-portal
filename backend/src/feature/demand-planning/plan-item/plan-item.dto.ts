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
    @ApiPropertyOptional()
    seed: UpdatePlanItemSeedDto

    @ApiPropertyOptional()
    forecast: UpdatePlanItemForecastDto
}
