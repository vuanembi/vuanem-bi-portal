import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { BigQueryProvider } from '../../../provider/warehouse/bigquery.service';

import { Vendor } from './vendor.entity';

@Injectable()
export class VendorService {
    constructor(
        private readonly bigqueryProvider: BigQueryProvider,

        @InjectRepository(Vendor)
        private readonly vendorRepository: EntityRepository<Vendor>,
    ) {}

    async sync() {
        const sql = this.bigqueryProvider
            .build()
            .withSchema('IP_NetSuite')
            .from('VENDORS')
            .select({
                id: 'VENDOR_ID',
                name: 'FULL_NAME',
            });

        const upsert = (vendorData: Vendor) =>
            this.vendorRepository
                .findOneOrFail({ id: vendorData.id })
                .then((vendor) => {
                    this.vendorRepository.assign(vendor, vendor);
                    return vendor;
                })
                .catch(() => this.vendorRepository.create(vendorData));

        return this.bigqueryProvider
            .query<Vendor>(sql.toQuery())
            .then((vendorsData) =>
                Promise.all(vendorsData.map(upsert)).then((vendors) =>
                    this.vendorRepository.flush().then(() => vendors),
                ),
            );
    }

    findAll() {
        return this.vendorRepository.findAll();
    }
}
