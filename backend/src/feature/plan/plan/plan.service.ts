import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plan } from './plan.entity';

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan)
        private planRepository: Repository<Plan>,
    ) {}

    create(product) {
        return this.planRepository.save(product);
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
