import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';
import { faker } from '@faker-js/faker';
import { range } from 'lodash';

import { CreatePlanItemDto } from '../../feature/plan/plan-item/plan-item.dto';

const mockFloat = () =>
    faker.datatype.number({
        max: 0.99,
        min: 0.01,
        precision: 0.01,
    });

const createMockPlanItem = (): CreatePlanItemDto => ({
    sku: faker.random.numeric(13),
    startOfWeek: faker.date.soon(),
    region: 'north',
    avgItemDiscount: mockFloat(),
    avgOrderDiscount: mockFloat(),
    discount: mockFloat(),
    workingDays: faker.datatype.number(),
    inventory: faker.datatype.number(),
    moq: faker.datatype.number(),
    leadTime: faker.datatype.number(),
});

@Injectable()
export class BigQueryService {
    private bigQuery: BigQuery;

    constructor() {
        this.bigQuery = new BigQuery();
    }

    async query() {
        return range(1, 10).map(() => createMockPlanItem());
        // return this.bigQuery.query(query).then(([rows]) => rows);
    }
}
