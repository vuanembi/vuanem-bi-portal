import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Plan } from './plan/plan.entity';
import { PlanItem } from './plan-item/plan-item.entity';
import { PlanItemRegion } from './plan-item/plan-item-region.entity';
import { PlanStatus } from './plan-status/plan-status.entity';

import { PlanService } from './plan/plan.service';
import { PlanController } from './plan/plan.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Plan, PlanItem, PlanItemRegion, PlanStatus]),
    ],
    providers: [PlanService],
    controllers: [PlanController],
})
export class ProductModule {}
