import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlanItem } from './plan-item.entity';
import { UpdateDto } from './plan-item.dto';

@Injectable()
export class PlanItemService {
    constructor(
        @InjectRepository(PlanItem)
        private planItemRepository: Repository<PlanItem>,
    ) {}

    findAll(sku?: string, region?: string) {
        return this.planItemRepository.find({
            where: { sku, region },
        });
    }

    findOne(id: number) {
        return this.planItemRepository.findOneBy({ id });
    }

    async update(id: number, updatePlanItemDto: UpdateDto) {
        return this.findOne(id).then((planItem) =>
            this.planItemRepository.save({ ...planItem, ...updatePlanItemDto }),
        );
    }
}
