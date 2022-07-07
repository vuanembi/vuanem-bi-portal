import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { PlanItem } from './plan-item.entity';
import { GetPlanItemsDto, UpdatePlanItemDto } from './plan-item.dto';

@Injectable()
export class PlanItemService {
    constructor(
        @InjectRepository(PlanItem)
        private readonly planItemRepository: EntityRepository<PlanItem>,
    ) {}

    findAll({ planId }: GetPlanItemsDto) {
        return this.planItemRepository.find({
            plan: { id: planId },
        });
    }

    async findOne(id: number) {
        return this.planItemRepository.findOneOrFail({ id });
    }

    async update(id: number, updatePlanItemDto: UpdatePlanItemDto) {
        return this.findOne(id).then(async (planItem) => {
            this.planItemRepository.assign(planItem, updatePlanItemDto);
            await this.planItemRepository.persistAndFlush(planItem);
            return planItem;
        });
    }
}
