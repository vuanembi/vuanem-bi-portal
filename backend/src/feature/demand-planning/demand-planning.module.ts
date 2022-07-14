import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';
import { AutoMLProvider } from '../../provider/automl/automl.service';

import { NetSuiteModule } from '../netsuite/netsuite.module';

import { Plan } from './plan/plan.entity';
import { PlanService } from './plan/plan.service';
import { PlanController } from './plan/plan.controller';

import { PlanItem } from './plan-item/plan-item.entity';
import { PlanItemService } from './plan-item/plan-item.service';
import { PlanItemController } from './plan-item/plan-item.controller';

import { PlanItemSeed } from './plan-item/plan-item-seed.entity';
import { PlanItemForecast } from './plan-item/plan-item-forecast.entity';
import { PlanItemVendor } from './plan-item/plan-item-vendor.entity';

@Module({
    imports: [
        MikroOrmModule.forFeature([
            Plan,
            PlanItem,
            PlanItemSeed,
            PlanItemForecast,
            PlanItemVendor,
        ]),
        NetSuiteModule,
    ],
    providers: [BigQueryProvider, AutoMLProvider, PlanService, PlanItemService],
    controllers: [PlanController, PlanItemController],
})
export class DemandPlanningModule {}
