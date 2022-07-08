import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';

import { Class } from './class/class.entity';

import { Item } from './item/item.entity';

import { Plan } from './plan/plan.entity';
import { PlanService } from './plan/plan.service';
import { PlanController } from './plan/plan.controller';

import { PlanItem } from './plan-item/plan-item.entity';
import { PlanItemService } from './plan-item/plan-item.service';
import { PlanItemController } from './plan-item/plan-item.controller';

import { Vendor } from './vendor/vendor.entity';
import { VendorService } from './vendor/vendor.service';
import { VendorController } from './vendor/vendor.controller';

@Module({
    imports: [MikroOrmModule.forFeature([Class, Item, Plan, PlanItem, Vendor])],
    providers: [BigQueryProvider, PlanService, PlanItemService, VendorService],
    controllers: [PlanController, PlanItemController, VendorController],
})
export class DemandPlanningModule {}
