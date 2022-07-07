import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlanItem } from './plan-item.entity';
import { UpdatePlanItemDto } from './plan-item.dto';

@Injectable()
export class PlanItemService {
    constructor(
        @InjectRepository(PlanItem)
        private readonly planItemRepository: Repository<PlanItem>,
    ) {}

    async update(id: number, updatePlanItemDto: UpdatePlanItemDto) {
        return this.planItemRepository.update(id, updatePlanItemDto);
    }
}
