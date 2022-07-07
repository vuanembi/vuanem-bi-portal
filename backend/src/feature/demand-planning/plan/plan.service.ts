import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, QueryOrder } from '@mikro-orm/core';

import * as dayjs from 'dayjs';

import { Plan, PlanStatus } from './plan.entity';
import { CreatePlanDto } from './plan.dto';

import { PlanItem } from '../plan-item/plan-item.entity';
import { CreatePlanItemDto } from '../plan-item/plan-item.dto';

import { Vendor } from '../vendor/vendor.entity';

import { faker } from '@faker-js/faker';

const mockFloat = () =>
    faker.datatype.number({
        max: 0.99,
        min: 0.01,
        precision: 0.01,
    });

const createMockPlanItems = (date: Date): CreatePlanItemDto[] => {
    const sku = faker.random.numeric(13);
    const startOfWeeks = Array(8)
        .fill(undefined)
        .map((_, i) => dayjs(date).add(i, 'week').toDate());
    const regions = ['north', 'south'];

    return regions.flatMap((region) =>
        startOfWeeks.map((startOfWeek) => ({
            sku,
            startOfWeek,
            region,
            avgItemDiscount: mockFloat(),
            avgOrderDiscount: mockFloat(),
            discount: mockFloat(),
            workingDays: faker.datatype.number(),
            inventory: faker.datatype.number(),
            moq: faker.datatype.number(),
            leadTime: faker.datatype.number(),
        })),
    );
};

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan)
        private planRepository: EntityRepository<Plan>,

        @InjectRepository(PlanItem)
        private planItemRepository: EntityRepository<PlanItem>,

        @InjectRepository(Vendor)
        private vendorRepository: EntityRepository<Vendor>,
    ) {}

    async create(createPlanDto: CreatePlanDto) {
        const [itemData, vendor] = await Promise.all([
            Promise.resolve(
                Array(4)
                    .fill(null)
                    .map(() =>
                        createMockPlanItems(createPlanDto.startOfForecastWeek),
                    )
                    .flat(),
            ),
            this.vendorRepository.getReference(createPlanDto.vendorId),
        ]);

        const planItems = itemData.map((item) =>
            this.planItemRepository.create(item),
        );

        const plan = this.planRepository.create({
            ...createPlanDto,
            status: PlanStatus.DRAFT,
            vendor,
            items: planItems,
        });

        return this.planRepository.persistAndFlush(plan).then(() => plan);
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

    async forecast(id: number) {
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
