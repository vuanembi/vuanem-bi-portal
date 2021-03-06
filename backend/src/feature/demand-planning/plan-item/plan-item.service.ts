import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import * as dayjs from 'dayjs';

import { ItemService } from '../../netsuite/item/item.service';

import { AutoMLProvider } from '../../../provider/automl/automl.service';

import { PlanItem } from './plan-item.entity';
import { CreatePlanItemDto } from '../plan-item/plan-item.dto';
import { UpdatePlanItemDto } from './plan-item.dto';

import { PlanItemSeed } from './plan-item-seed.entity';
import { PlanItemForecast } from './plan-item-forecast.entity';
import { PlanItemVendor } from './plan-item-vendor.entity';

import { faker } from '@faker-js/faker';
import { Plan } from '../plan/plan.entity';

const mockFloat = () =>
    faker.datatype.number({
        max: 0.99,
        min: 0.01,
        precision: 0.01,
    });

const mockPlanItems = (date: Date): CreatePlanItemDto[] => {
    const startOfWeeks = Array(4)
        .fill(undefined)
        .map((_, i) => dayjs(date).add(i, 'week').toDate());
    const regions = ['north', 'south'];

    return regions.flatMap((region) =>
        startOfWeeks.map((startOfWeek) => ({
            startOfWeek,
            region,
            avgItemDiscount: mockFloat(),
            avgOrderDiscount: mockFloat(),
            basePrice: faker.datatype.number(),
            workingDays: faker.datatype.number(),
        })),
    );
};

@Injectable()
export class PlanItemService {
    constructor(
        private readonly autoMLProvider: AutoMLProvider,

        private readonly itemService: ItemService,

        @InjectRepository(PlanItem)
        private readonly planItemRepository: EntityRepository<PlanItem>,

        @InjectRepository(PlanItemSeed)
        private readonly planItemSeedRepository: EntityRepository<PlanItemSeed>,

        @InjectRepository(PlanItemForecast)
        private readonly planItemForecastRepository: EntityRepository<PlanItemForecast>,

        @InjectRepository(PlanItemVendor)
        private readonly planItemVendorRepository: EntityRepository<PlanItemVendor>,
    ) {}

    async create(plan: Plan, startOfForecastWeek: Date) {
        const items = await this.itemService.findAll(2);
        const planItems: PlanItem[] = items
            .map((item) =>
                mockPlanItems(startOfForecastWeek).map((mock) => {
                    const planItemSeed =
                        this.planItemSeedRepository.create(mock);

                    this.planItemSeedRepository.persist(planItemSeed);

                    const planItem = this.planItemRepository.create({
                        plan,
                        item,
                        ...mock,
                        seed: planItemSeed,
                    });

                    const planItemVendors = item.vendor
                        .getItems()
                        .map((vendor) =>
                            this.planItemVendorRepository.create({
                                planItem,
                                vendor: vendor.id,
                                allocation: 1 / item.vendor.length,
                            }),
                        );

                    this.planItemVendorRepository.persist(planItemVendors);
                    return planItem;
                }),
            )
            .flat();

        this.planItemRepository.persist(planItems.flat());

        return planItems;
    }

    async findOne(id: number) {
        return this.planItemRepository.findOneOrFail(
            { id },
            { populate: ['item', 'seed', 'forecast', 'vendors'] },
        );
    }

    async forecast(planItems: PlanItem[]) {
        const forecastedPlanItems = await Promise.all(
            planItems.map((planItem) => this.forecastOne(planItem)),
        );

        this.planItemRepository.persist(forecastedPlanItems);

        return forecastedPlanItems;
    }

    async forecastOne(planItem: PlanItem) {
        const qtyDemandML = await this.autoMLProvider.forecastPlanItems([
            planItem.weekNo,
            planItem.year,
            dayjs(planItem.startOfWeek).format('YYYY-MM-DDTHH:mm:ss'),
            planItem.item.getProperty('sku'),
            planItem.region,
            planItem.seed.getProperty('avgItemDiscount'),
            planItem.seed.getProperty('avgOrderDiscount'),
            planItem.seed.getProperty('basePrice'),
            planItem.seed.getProperty('workingDays'),
        ]);

        const planItemForecast = planItem.forecast
            ? planItem.forecast.getEntity()
            : this.planItemForecastRepository.create({});

        this.planItemForecastRepository.assign(planItemForecast, {
            percentageChange1w: mockFloat(),
            percentageChange1m: mockFloat(),
            percentageChange3m: mockFloat(),
            qtyDemandPurchasing: qtyDemandML,
            qtyDemandML,
        });

        this.planItemForecastRepository.persist(planItemForecast);

        this.planItemRepository.assign(planItem, {
            forecast: planItemForecast,
        });

        return planItem;
    }

    async update(id: number, updatePlanItemDto: UpdatePlanItemDto) {
        return this.planItemRepository
            .findOneOrFail({ id })
            .then(async (planItem) => {
                this.planItemRepository.assign(planItem, updatePlanItemDto);
                await this.planItemRepository.persistAndFlush(planItem);
                return planItem;
            });
    }
}
