import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';

import { NetSuiteModule } from '../netsuite/netsuite.module';

import { Plan } from './plan/plan.entity';
import { PlanService } from './plan/plan.service';
import { PlanController } from './plan/plan.controller';

import { PlanItem } from './plan-item/plan-item.entity';
import { PlanItemService } from './plan-item/plan-item.service';
import { PlanItemController } from './plan-item/plan-item.controller';

import { PlanItemVendor } from './plan-item/plan-item-vendor.entity';

@Module({
    imports: [
        MikroOrmModule.forFeature([Plan, PlanItem, PlanItemVendor]),
        NetSuiteModule,
    ],
    providers: [BigQueryProvider, PlanService, PlanItemService],
    controllers: [PlanController, PlanItemController],
})
export class DemandPlanningModule {}
