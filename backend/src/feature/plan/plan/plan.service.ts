import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plan } from './plan.entity';
import { CreatePlanDto } from './plan.dto';

import { StatusEnum, PlanStatus } from '../plan-status/plan-status.entity';
import { PlanItem } from '../plan-item/plan-item.entity';

import { BigQueryService } from '../../../provider/warehouse/bigquery.service';

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan)
        private planRepository: Repository<Plan>,

        @InjectRepository(PlanStatus)
        private planStatusRepository: Repository<PlanStatus>,

        @InjectRepository(PlanItem)
        private planItemRepository: Repository<PlanItem>,

        private bigQueryService: BigQueryService,
    ) {}

    async create(createPlanDto: CreatePlanDto) {
        const [itemData, status] = await Promise.all([
            this.bigQueryService.query(),
            this.planStatusRepository.preload({
                id: 1,
                name: StatusEnum.DRAFT,
            }),
        ]);

        const planItems = itemData.map((item) =>
            this.planItemRepository.create(item),
        );

        const plan = this.planRepository.create({
            ...createPlanDto,
            items: planItems,
            status,
        });

        return this.planRepository.save(plan);
    }

    findAll() {
        return this.planRepository.find();
    }

    findOne(id: number) {
        return this.planRepository.findOneBy({ id });
    }
}
