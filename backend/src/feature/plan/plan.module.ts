import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BigQueryService } from 'src/provider/warehouse/bigquery.service';

import { Plan } from './plan/plan.entity';
import { PlanService } from './plan/plan.service';
import { PlanController } from './plan/plan.controller';

import { PlanStatus } from './plan-status/plan-status.entity';
import { PlanStatusService } from './plan-status/plan-status.service';

import { PlanItem } from './plan-item/plan-item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Plan, PlanStatus, PlanItem])],
    providers: [BigQueryService, PlanService, PlanStatusService],
    controllers: [PlanController],
})
export class PlanModule implements OnApplicationBootstrap {
    constructor(private planStatusService: PlanStatusService) {}

    async onApplicationBootstrap() {
        await Promise.all(this.planStatusService.seed());
    }
}
