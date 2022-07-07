import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        private planRepository: Repository<Plan>,

        @InjectRepository(PlanItem)
        private planItemRepository: Repository<PlanItem>,

        @InjectRepository(Vendor)
        private vendorRepository: Repository<Vendor>,
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
            this.vendorRepository.preload({
                id: createPlanDto.vendorId,
            }),
        ]);

        const planItems = itemData.map((item) =>
            this.planItemRepository.create(item),
        );

        const plan = this.planRepository.create({
            ...createPlanDto,
            vendor,
            items: planItems,
        });

        return this.planRepository.save(plan);
    }

    async findAll() {
        return this.planRepository.find();
    }

    findOne(id: number) {
        return this.planRepository.findOneByOrFail({ id });
    }

    async findOneItems(id: number) {
        return this.planRepository
            .findOneOrFail({
                where: { id },
                relations: {
                    items: true,
                },
            })
            .then(({ items }) => items);
    }

    async forecast(id: number) {
        return this.planRepository.update(id, {
            status: PlanStatus.FORECASTED,
        });
    }

    async review(id: number) {
        return this.planRepository.update(id, {
            status: PlanStatus.REVIEWED,
        });
    }
}
