import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';

import { Class } from './class/class.entity';
import { ClassService } from './class/class.service';

import { Vendor } from './vendor/vendor.entity';
import { VendorService } from './vendor/vendor.service';

export class NetSuiteSeeder extends Seeder {
    async run(em: EntityManager) {
        const bigQueryProvider = new BigQueryProvider();

        const classService = new ClassService(
            bigQueryProvider,
            em.getRepository(Class),
        );

        const vendorService = new VendorService(
            bigQueryProvider,
            em.getRepository(Vendor),
        );

        await classService.sync();
        await vendorService.sync();
    }
}
