import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { PlanItem } from './plan-item.entity';
import { CreatePlanItemDto } from '../plan-item/plan-item.dto';
import { UpdatePlanItemDto } from './plan-item.dto';

import { PlanItemVendor } from './plan-item-vendor.entity';

import { Plan } from '../plan/plan.entity';
import { BigQueryProvider } from '../../../provider/warehouse/bigquery.service';

@Injectable()
export class PlanItemService {
    constructor(
        private readonly bigqueryProvider: BigQueryProvider,

        @InjectRepository(PlanItem)
        private readonly planItemRepository: EntityRepository<PlanItem>,

        @InjectRepository(PlanItemVendor)
        private readonly planItemVendorRepository: EntityRepository<PlanItemVendor>,
    ) {}

    async create(plan: Plan, classIds: number[]) {
        const sql = this.bigqueryProvider.qb
            .withSchema('OP_DemandPlanning')
            .from('DP_N8W_QTYDemand_CheckInventory_Vendors')
            .whereIn('CLASS_ID', classIds)
            .select({
                classId: 'CLASS_ID',
                productGroupCode: 'PRODUCT_GROUP_CODE',
                startOfWeek: 'START_OF_WEEK',
                width: 'WIDTH',
                length: 'LENGTH_0',
                thickness: 'THICKNESS',
                region: 'REGION_DP',
                avgItemDiscount: 'AVG_ITEM_DISCOUNT',
                avgOrderDiscount: 'AVG_ORDER_DISCOUNT',
                basePrice: 'BASE_PRICE_EXCLUDE_VAT',
                workingDays: 'NO_OF_WORKING_DAYS',
                qtyL1w: 'QTY_SALES_L1W',
                qtyL4w: 'QTY_SALES_L4W',
                qtyL8w: 'QTY_SALES_L8W',
                seedingInventory: 'SEEDING_INVENTORY',
                qtyBackOrder: 'QTY_BACKORDER',
                qtyCommitted: 'QTY_COMMITED',
                qtyOnOrder: 'QTY_ONORDER',
                safetyStockLevelInDays: 'SAFETY_STOCK_LEVEL_IN_DAYS',
                vendorIds: 'VENDOR_IDS',
            });

        const createDtos = await this.bigqueryProvider.query<CreatePlanItemDto>(
            sql.toQuery(),
        );

        const items = createDtos.map((createDto) => {
            const item = this.planItemRepository.create({
                ...createDto,
                class: createDto.classId,
                plan,
            });

            const vendors = createDto.vendorIds.map((vendorId) =>
                this.planItemVendorRepository.create({
                    planItem: item,
                    vendor: vendorId,
                    allocation: 1 / createDto.vendorIds.length,
                }),
            );
            this.planItemVendorRepository.persist(vendors);

            return item;
        });

        this.planItemRepository.persist(items);

        return items;
    }

    async findOne(id: number) {
        return this.planItemRepository.findOneOrFail(
            { id },
            { populate: ['class', 'vendors'] },
        );
    }

    // async forecast(planItems: PlanItem[]) {
    //     const forecastedPlanItems = await Promise.all(
    //         planItems.map((planItem) => this.forecastOne(planItem)),
    //     );

    //     this.planItemRepository.persist(forecastedPlanItems);

    //     return forecastedPlanItems;
    // }

    // async forecastOne(planItem: PlanItem) {
    //     const qtyDemandML = await this.autoMLProvider.forecastPlanItems([
    //         planItem.weekNo,
    //         planItem.year,
    //         dayjs(planItem.startOfWeek).format('YYYY-MM-DDTHH:mm:ss'),
    //         planItem.item.getProperty('sku'),
    //         planItem.region,
    //         planItem.seed.getProperty('avgItemDiscount'),
    //         planItem.seed.getProperty('avgOrderDiscount'),
    //         planItem.seed.getProperty('basePrice'),
    //         planItem.seed.getProperty('workingDays'),
    //     ]);

    //     const planItemForecast = planItem.forecast
    //         ? planItem.forecast.getEntity()
    //         : this.planItemForecastRepository.create({});

    //     this.planItemForecastRepository.assign(planItemForecast, {
    //         percentageChange1w: mockFloat(),
    //         percentageChange1m: mockFloat(),
    //         percentageChange3m: mockFloat(),
    //         qtyDemandPurchasing: qtyDemandML,
    //         qtyDemandML,
    //     });

    //     this.planItemForecastRepository.persist(planItemForecast);

    //     this.planItemRepository.assign(planItem, {
    //         forecast: planItemForecast,
    //     });

    //     return planItem;
    // }

    async update(id: number, updatePlanItemDto: UpdatePlanItemDto) {
        const item = await this.planItemRepository.findOneOrFail({ id });
        this.planItemRepository.assign(item, updatePlanItemDto);
        await this.planItemRepository.persistAndFlush(item);
        return item;
    }
}
