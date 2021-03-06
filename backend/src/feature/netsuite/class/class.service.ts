import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { BigQueryProvider } from '../../../provider/warehouse/bigquery.service';

import { Class } from './class.entity';

@Injectable()
export class ClassService {
    constructor(
        private readonly bigqueryProvider: BigQueryProvider,

        @InjectRepository(Class)
        private readonly classRepository: EntityRepository<Class>,
    ) {}

    async sync() {
        const sql = this.bigqueryProvider.qb
            .withSchema('IP_NetSuite')
            .from('CLASSES')
            .whereNotNull('PRODUCT_GROUP_CODE')
            .whereNotNull('NAME')
            .whereRaw(`starts_with(NAME, '11')`)
            .select({
                id: 'CLASS_ID',
                sku: 'PRODUCT_GROUP_CODE',
                name: 'NAME',
            });

        const upsert = (classData: Class) =>
            this.classRepository
                .findOneOrFail({ id: classData.id })
                .catch(() => {
                    const class_ = this.classRepository.create(classData);
                    this.classRepository.persist(class_);
                    return class_;
                })
                .then((class_) => {
                    this.classRepository.assign(class_, class_);
                    return class_;
                });

        return this.bigqueryProvider
            .query<Class>(sql.toQuery())
            .then(async (classesData) => {
                await Promise.all(classesData.map(upsert));
                await this.classRepository.flush();
                return this.classRepository.count();
            });
    }

    findAll() {
        return this.classRepository.findAll();
    }
}
