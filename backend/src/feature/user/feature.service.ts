import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { Feature } from './feature.entity';

@Injectable()
export class FeatureService {
    constructor(
        @InjectRepository(Feature)
        private readonly featureRepository: EntityRepository<Feature>,
    ) {}

    async upsert(path: string, i: number) {
        return this.featureRepository
            .findOneOrFail({ name: path })
            .catch(() => {
                const feature = this.featureRepository.create({
                    id: i + 1,
                    name: path,
                });
                this.featureRepository.persist(feature);
                return feature;
            })
            .then((feature) => {
                this.featureRepository.assign(feature, feature);
                return feature;
            });
    }

    async seed() {
        const featurePaths = ['/demand-planning', '/data-service'];
        const features = await Promise.all(
            featurePaths.map((path, i) => this.upsert(path, i)),
        );
        await this.featureRepository.persistAndFlush(features);
        return features;
    }
}
