import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { BigQueryProvider } from '../../../provider/warehouse/bigquery.service';

import { Vendor } from './vendor.entity';

@Injectable()
export class VendorService {
    constructor(
        private readonly bigQueryProvider: BigQueryProvider,

        @InjectRepository(Vendor)
        private readonly vendorRepository: EntityRepository<Vendor>,
    ) {}

    async sync() {
        const sql = this.bigQueryProvider
            .build()
            .withSchema('IP_NetSuite')
            .from('VENDORS')
            .select({
                id: 'VENDOR_ID',
                name: 'FULL_NAME',
            });

        return this.bigQueryProvider
            .query<Vendor>(sql.toQuery())
            .then((vendors) =>
                this.vendorRepository.upsert(vendors, {
                    conflictPaths: ['id'],
                    skipUpdateIfNoValuesChanged: true,
                }),
            );
    }

    findAll() {
        return this.vendorRepository.findAll();
    }
}
