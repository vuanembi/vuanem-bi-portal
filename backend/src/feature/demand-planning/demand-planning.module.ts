import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';

import { Class } from './class/class.entity';
import { ClassService } from './class/class.service';
import { ClassController } from './class/class.controller';

import { Vendor } from './vendor/vendor.entity';
import { VendorService } from './vendor/vendor.service';
import { VendorController } from './vendor/vendor.controller';

import { Item } from './item/item.entity';
import { ItemService } from './item/item.service';
import { ItemController } from './item/item.controller';

import { Plan } from './plan/plan.entity';
import { PlanService } from './plan/plan.service';
import { PlanController } from './plan/plan.controller';

import { PlanItem } from './plan-item/plan-item.entity';
import { PlanItemService } from './plan-item/plan-item.service';
import { PlanItemController } from './plan-item/plan-item.controller';

@Module({
    imports: [MikroOrmModule.forFeature([Class, Vendor, Item, Plan, PlanItem])],
    providers: [
        BigQueryProvider,
        ClassService,
        VendorService,
        ItemService,
        PlanService,
        PlanItemService,
    ],
    controllers: [
        ClassController,
        VendorController,
        ItemController,
        PlanController,
        PlanItemController,
    ],
})
export class DemandPlanningModule {}
