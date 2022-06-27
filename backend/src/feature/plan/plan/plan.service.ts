import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';

import { Plan } from './plan.entity';
import { StatusEnum, PlanStatus } from '../plan-status/plan-status.entity';
import { CreatePlan } from './plan.dto';

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan)
        private planRepository: Repository<Plan>,
        @InjectRepository(PlanStatus)
        private planStatusRepository: Repository<PlanStatus>,
    ) {}

    async create(createPlanDto: CreatePlan) {
        return this.planStatusRepository
            .findOne({
                where: { name: Equal(StatusEnum.DRAFT) },
            })
            .then((status) =>
                this.planRepository.save({
                    ...createPlanDto,
                    status,
                }),
            );
    }

    findAll() {
        return this.planRepository.find();
    }

    findOne(id: number) {
        return this.planRepository.findOneBy({ id });
    }

    async update(id: number, updateProductDto) {
        return this.findOne(id).then((product) =>
            this.planRepository.save({ ...product, ...updateProductDto }),
        );
    }

    async remove(id: number) {
        return this.findOne(id).then((product) =>
            this.planRepository.remove(product),
        );
    }
}
