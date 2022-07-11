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
        const sql = this.bigqueryProvider.qb
            .withSchema('IP_NetSuite')
            .from('VENDORS')
            .select({
                id: 'VENDOR_ID',
                name: 'FULL_NAME',
            });

        const upsert = (vendorData: Vendor) =>
            this.vendorRepository
                .findOneOrFail({ id: vendorData.id })
                .catch(() => {
                    const vendor = this.vendorRepository.create(vendorData);
                    this.vendorRepository.persist(vendor);
                    return vendor;
                })
                .then((vendor) => {
                    this.vendorRepository.assign(vendor, vendor);
                    return vendor;
                });

        return this.bigqueryProvider
            .query<Vendor>(sql.toQuery())
            .then(async (vendorsData) => {
                await Promise.all(vendorsData.map(upsert));
                await this.vendorRepository.flush();
                return this.vendorRepository.count();
            });
    }

    findAll() {
        return this.vendorRepository.findAll();
    }
}
