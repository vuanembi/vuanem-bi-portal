import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';

import { Class } from '../netsuite/class/class.entity';
import { ClassService } from '../netsuite/class/class.service';
import { ClassController } from '../netsuite/class/class.controller';

import { Vendor } from '../netsuite/vendor/vendor.entity';
import { VendorService } from '../netsuite/vendor/vendor.service';
import { VendorController } from '../netsuite/vendor/vendor.controller';

@Module({
    imports: [MikroOrmModule.forFeature([Class, Vendor])],
    providers: [BigQueryProvider, ClassService, VendorService],
    controllers: [ClassController, VendorController],
})
export class NetSuiteModule {}
