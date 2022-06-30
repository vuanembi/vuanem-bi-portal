import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';

import { Plan } from './plan/plan.entity';
import { PlanService } from './plan/plan.service';
import { PlanController } from './plan/plan.controller';

import { PlanItem } from './plan-item/plan-item.entity';
import { PlanItemService } from './plan-item/plan-item.service';
import { PlanItemController } from './plan-item/plan-item.controller';

import { PlanStatus } from './plan-status/plan-status.entity';
import { PlanStatusService } from './plan-status/plan-status.service';

import { Vendor } from './vendor/vendor.entity';
import { VendorService } from './vendor/vendor.service';
import { VendorController } from './vendor/vendor.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Plan, PlanItem, PlanStatus, Vendor])],
    providers: [
        BigQueryProvider,
        PlanService,
        PlanItemService,
        PlanStatusService,
        VendorService,
    ],
    controllers: [PlanController, PlanItemController, VendorController],
})
export class DemandPlanningModule implements OnApplicationBootstrap {
    constructor(private planStatusService: PlanStatusService) {}

    async onApplicationBootstrap() {
        await Promise.all(this.planStatusService.seed());
    }
}
