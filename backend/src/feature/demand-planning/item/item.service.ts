import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { BigQueryProvider } from '../../../provider/warehouse/bigquery.service';

import { Class } from '../class/class.entity';
import { Item } from './item.entity';
import { Vendor } from '../vendor/vendor.entity';

type ItemData = Pick<
    Item,
    'id' | 'sku' | 'name' | 'width' | 'length' | 'thickness'
> & {
    classId: Class['id'];
    vendorIds: Vendor['id'][];
};

@Injectable()
export class ItemService {
    constructor(
        private readonly bigqueryProvider: BigQueryProvider,

        @InjectRepository(Class)
        private readonly classRepository: EntityRepository<Class>,

        @InjectRepository(Item)
        private readonly itemRepository: EntityRepository<Item>,

        @InjectRepository(Vendor)
        private readonly vendorRepository: EntityRepository<Vendor>,
    ) {}

    async sync() {
        const sql = this.bigqueryProvider.qb
            .withSchema('IP_NetSuite')
            .from('ITEMS')
            .leftJoin(
                'ITEM_VENDOR_MAP',
                'ITEMS.ITEM_ID',
                'ITEM_VENDOR_MAP.ITEM_ID',
            )
            .select({
                id: 'ITEMS.ITEM_ID',
                sku: 'ITEMS.PRODUCT_CODE',
                name: 'ITEMS.DISPLAYNAME',
                width: 'ITEMS.WIDTH',
                length: 'ITEMS.LENGTH_0',
                thickness: 'ITEMS.THICKNESS',
                classId: 'ITEMS.CLASS_ID',
                vendorIds: this.bigqueryProvider.qb.raw(
                    `array_agg(ITEM_VENDOR_MAP.VENDOR_ID)`,
                ),
            })
            .whereNotNull('ITEMS.CLASS_ID')
            .whereNotNull('ITEMS.VENDOR_ID')
            .whereNotNull('ITEMS.PRODUCT_CODE')
            .whereNotNull('ITEMS.DISPLAYNAME')
            .whereNotNull('ITEMS.WIDTH')
            .whereNotNull('ITEMS.LENGTH_0')
            .whereNotNull('ITEMS.THICKNESS')
            .whereRaw(`starts_with(ITEMS.FULL_NAME, '11')`)
            .groupBy([
                'ITEMS.ITEM_ID',
                'ITEMS.PRODUCT_CODE',
                'ITEMS.DISPLAYNAME',
                'ITEMS.WIDTH',
                'ITEMS.LENGTH_0',
                'ITEMS.THICKNESS',
                'ITEMS.CLASS_ID',
            ]);

        const findClassVendor = (itemData: ItemData) =>
            Promise.all([
                this.classRepository.findOne({
                    id: itemData.classId,
                }),
                this.vendorRepository.find({ id: { $in: itemData.vendorIds } }),
            ]);

        const upsert = async (itemData: ItemData) => {
            const [class_, vendors] = await findClassVendor(itemData);

            return this.itemRepository
                .findOneOrFail({ id: itemData.id })
                .then((item) => {
                    this.itemRepository.assign(item, {
                        ...itemData,
                        class: class_,
                        vendor: vendors,
                    });
                    return item;
                })
                .catch(() => {
                    const item = this.itemRepository.create({
                        ...itemData,
                        class: class_,
                        vendor: vendors,
                    });
                    return item;
                });
        };

        return this.bigqueryProvider
            .query<ItemData>(sql.toQuery())
            .then(async (itemsData) => {
                console.log(itemsData.length);
                const items = await Promise.all(itemsData.map(upsert));
                await this.itemRepository.flush();
                return items;
            });
    }

    findAll() {
        return this.itemRepository.findAll({ populate: ['vendor'] });
    }
}
