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

        this.planRepository.persist(plan);

        return this.planItemService
            .create(plan, createPlanDto.classIds)
            .then(() => this.planRepository.flush())
            .then(() => plan);
    }

    async findAll() {
        return this.planRepository.findAll({
            orderBy: { createdAt: QueryOrder.DESC },
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
        return this.findOne(id).then(async (plan) => {
            this.planRepository.assign(plan, { status: PlanStatus.FORECAST });
            await this.planRepository.persistAndFlush(plan);
        });
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
