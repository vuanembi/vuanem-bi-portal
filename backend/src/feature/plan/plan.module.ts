import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BigQueryService } from '../../provider/warehouse/bigquery.service';

import { Plan } from './plan/plan.entity';
import { PlanService } from './plan/plan.service';
import { PlanController } from './plan/plan.controller';

import { PlanItem } from './plan-item/plan-item.entity';
import { PlanItemService } from './plan-item/plan-item.service';
import { PlanItemController } from './plan-item/plan-item.controller';

import { PlanStatus } from './plan-status/plan-status.entity';
import { PlanStatusService } from './plan-status/plan-status.service';

@Module({
    imports: [TypeOrmModule.forFeature([Plan, PlanItem, PlanStatus])],
    providers: [
        BigQueryService,
        PlanService,
        PlanItemService,
        PlanStatusService,
    ],
    controllers: [PlanController, PlanItemController],
})
export class PlanModule implements OnApplicationBootstrap {
    constructor(private planStatusService: PlanStatusService) {}

    async onApplicationBootstrap() {
        await Promise.all(this.planStatusService.seed());
    }
}
