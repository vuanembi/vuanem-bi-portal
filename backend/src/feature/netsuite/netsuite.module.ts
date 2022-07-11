import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';

import { Class } from '../netsuite/class/class.entity';
import { ClassService } from '../netsuite/class/class.service';
import { ClassController } from '../netsuite/class/class.controller';

import { Vendor } from '../netsuite/vendor/vendor.entity';
import { VendorService } from '../netsuite/vendor/vendor.service';
import { VendorController } from '../netsuite/vendor/vendor.controller';

import { Item } from '../netsuite/item/item.entity';
import { ItemService } from '../netsuite/item/item.service';
import { ItemController } from '../netsuite/item/item.controller';

@Module({
    imports: [MikroOrmModule.forFeature([Class, Vendor, Item])],
    providers: [BigQueryProvider, ClassService, VendorService, ItemService],
    controllers: [ClassController, VendorController, ItemController],
})
export class NetSuiteModule {}
