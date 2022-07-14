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

export class UpdatePlanItemDto {
    @ApiPropertyOptional()
    avgItemDiscount?: number;

    @ApiPropertyOptional()
    seed: {
        avgItemDiscount?: number;
    }

    @ApiPropertyOptional()
    avgOrderDiscount?: number;

    @ApiPropertyOptional()
    basePrice?: number;

    @ApiPropertyOptional()
    workingDays?: number;

    @ApiPropertyOptional()
    qtyDemandML?: number | null;

    @ApiPropertyOptional()
    qtyDemandPurchasing?: number | null;

    @ApiPropertyOptional()
    qtyDemand?: number | null;
}
