import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';

import { StatusEnum, PlanStatus } from './plan-status.entity';

@Injectable()
export class PlanStatusService {
    constructor(
        @InjectRepository(PlanStatus)
        private planStatusRepository: Repository<PlanStatus>,
    ) {}

    seed() {
        const statuses = Object.values(StatusEnum);

        return statuses.map((status, id) =>
            this.planStatusRepository.save({ id, name: status }),
        );
    }
}
