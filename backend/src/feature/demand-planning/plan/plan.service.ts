import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, QueryOrder } from '@mikro-orm/core';

import * as dayjs from 'dayjs';

import { Vendor } from '../../netsuite/vendor/vendor.entity';
import { Item } from '../../netsuite/item/item.entity';

import { Plan, PlanStatus } from './plan.entity';
import { CreatePlanDto } from './plan.dto';

import { PlanItem } from '../plan-item/plan-item.entity';
import { CreatePlanItemDto } from '../plan-item/plan-item.dto';

import { PlanItemVendor } from '../plan-item/plan-item-vendor.entity';

import { faker } from '@faker-js/faker';

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
export class PlanService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: EntityRepository<Item>,

        @InjectRepository(Plan)
        private readonly planRepository: EntityRepository<Plan>,

        @InjectRepository(PlanItem)
        private readonly planItemRepository: EntityRepository<PlanItem>,

        @InjectRepository(PlanItemVendor)
        private readonly planItemVendorRepository: EntityRepository<PlanItemVendor>,
    ) {}

    async create(createPlanDto: CreatePlanDto) {
        const plan = this.planRepository.create({
            ...createPlanDto,
            status: PlanStatus.DRAFT,
        });

        const items = await this.itemRepository.findAll({
            populate: ['vendor'],
            limit: 2,
        });

        items

        const planItems = items.map((item) =>
            mockPlanItems(createPlanDto.startOfForecastWeek).map((mock) => {
                const planItem = this.planItemRepository.create({
                    plan,
                    ...mock,
                });

                this.planItemRepository.assign(planItem, {
                    item: item.id,
                });

                const planItemVendors = item.vendor.getItems().map((vendor) => {
                    const planItemVendor = this.planItemVendorRepository.create(
                        {},
                    );
                    this.planItemVendorRepository.assign(planItemVendor, {
                        planItem,
                        vendor: vendor.id,
                        allocation: 1 / item.vendor.length,
                    });
                    return planItemVendor;
                });

                this.planItemVendorRepository.persist(planItemVendors);
                return planItem;
            }),
        );
        
        planItems
        this.planItemRepository.persist(planItems.flat());


        return this.planItemRepository.flush().then(() => plan);
    }

    async findAll() {
        return this.planRepository.findAll({
            orderBy: {
                createdAt: QueryOrder.DESC,
            },
        });
    }

    findOne(id: number) {
        return this.planRepository.findOneOrFail({ id });
    }

    async findOneItems(id: number) {
        return this.planRepository
            .findOneOrFail({ id }, { populate: ['items'] })
            .then(async (plan) => {
                console.log(plan.items.getItems());
                return plan.items.getItems();
            });
        ``;
    }

    async forecast(id: number) {
        ``;
        return this.findOne(id).then(async (plan) => {
            this.planRepository.assign(plan, { status: PlanStatus.FORECASTED });
            await this.planRepository.persistAndFlush(plan);
        });
    }

    async review(id: number) {
        return this.findOne(id).then(async (plan) => {
            this.planRepository.assign(plan, { status: PlanStatus.REVIEWED });
            await this.planRepository.persistAndFlush(plan);
        });
    }
}
