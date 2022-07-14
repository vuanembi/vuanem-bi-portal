import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, QueryOrder } from '@mikro-orm/core';

import { Plan, PlanStatus } from './plan.entity';
import { CreatePlanDto } from './plan.dto';

import { PlanItemService } from '../plan-item/plan-item.service';

@Injectable()
export class PlanService {
    constructor(
        private readonly planItemService: PlanItemService,

        @InjectRepository(Plan)
        private readonly planRepository: EntityRepository<Plan>,
    ) {}

    async create(createPlanDto: CreatePlanDto) {
        const plan = this.planRepository.create({
            ...createPlanDto,
            status: PlanStatus.DRAFT,
        });

        return this.planItemService
            .create(plan, createPlanDto.startOfForecastWeek)
            .then(() => this.planRepository.flush())
            .then(() => plan);
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
            .then((plan) => plan.items.getItems());
    }

    async forecast(id: number) {
        const plan = await this.planRepository.findOneOrFail(
            { id },
            { populate: ['items', 'items.item.sku'] },
        );

        await this.planItemService.forecast(plan.items.getItems());

        this.planRepository.assign(plan, { status: PlanStatus.FORECAST });

        this.planRepository.persist(plan);

        return this.planRepository.flush().then(() => plan);
    }

    async checkInventory(id: number) {
        return this.findOne(id).then(async (plan) => {
            this.planRepository.assign(plan, { status: PlanStatus.INVENTORY });
            await this.planRepository.persistAndFlush(plan);
        });
    }

    async review(id: number) {
        return this.findOne(id).then(async (plan) => {
            this.planRepository.assign(plan, { status: PlanStatus.REVIEW });
            await this.planRepository.persistAndFlush(plan);
        });
    }
}
