import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plan } from './plan.entity';
import { CreatePlanDto } from './plan.dto';

import { StatusEnum, PlanStatus } from '../plan-status/plan-status.entity';

import { PlanItem } from '../plan-item/plan-item.entity';
import { CreatePlanItemDto } from '../plan-item/plan-item.dto';

import { Vendor } from '../vendor/vendor.entity';

import { faker } from '@faker-js/faker';
import { range } from 'lodash';

const mockFloat = () =>
    faker.datatype.number({
        max: 0.99,
        min: 0.01,
        precision: 0.01,
    });

const createMockPlanItem = (): CreatePlanItemDto => ({
    sku: faker.random.numeric(13),
    startOfWeek: faker.date.soon(),
    region: 'north',
    avgItemDiscount: mockFloat(),
    avgOrderDiscount: mockFloat(),
    discount: mockFloat(),
    workingDays: faker.datatype.number(),
    inventory: faker.datatype.number(),
    moq: faker.datatype.number(),
    leadTime: faker.datatype.number(),
});

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan)
        private planRepository: Repository<Plan>,

        @InjectRepository(PlanStatus)
        private planStatusRepository: Repository<PlanStatus>,

        @InjectRepository(PlanItem)
        private planItemRepository: Repository<PlanItem>,

        @InjectRepository(Vendor)
        private vendorRepository: Repository<Vendor>,
    ) {}

    async create(createPlanDto: CreatePlanDto) {
        const [itemData, status, vendor] = await Promise.all([
            Promise.resolve(range(1, 10).map(() => createMockPlanItem())),
            this.planStatusRepository.preload({
                id: 1,
                name: StatusEnum.DRAFT,
            }),
            this.vendorRepository.preload({
                id: createPlanDto.vendor_id,
            }),
        ]);

        const planItems = itemData.map((item) =>
            this.planItemRepository.create(item),
        );

        const plan = this.planRepository.create({
            ...createPlanDto,
            status,
            vendor,
            items: planItems,
        });

        return this.planRepository.save(plan);
    }

    findAll() {
        return this.planRepository.find({
            relations: {
                status: true,
            },
        });
    }

    findOne(id: number) {
        return this.planRepository.findOneBy({ id });
    }
}
