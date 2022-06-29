import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlanItem } from './plan-item.entity';
import { GetDto, UpdatePlanItemDto } from './plan-item.dto';

@Injectable()
export class PlanItemService {
    constructor(
        @InjectRepository(PlanItem)
        private readonly planItemRepository: Repository<PlanItem>,
    ) {}

    findAll({ sku, region }: GetDto) {
        return this.planItemRepository.find({
            where: { sku, region },
        });
    }

    findOne(id: number) {
        return this.planItemRepository.findOneBy({ id });
    }

    async update(id: number, updatePlanItemDto: UpdatePlanItemDto) {
        return this.planItemRepository.update(id, updatePlanItemDto);
    }
}
