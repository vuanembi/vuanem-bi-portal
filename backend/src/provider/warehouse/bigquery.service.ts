import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';
import { faker } from '@faker-js/faker';
import { range} from 'lodash'

import { CreateDto } from 'src/feature/plan/plan-item/plan-item.dto';

const createMockPlanItem = (): CreateDto => ({
    sku: faker.random.numeric(13),
    startOfWeek: faker.date.soon(),
    region: 'north',
    avgItemDiscount: faker.datatype.number({max: 0.99, precision: 0.01}),
    avgOrderDiscount: faker.datatype.number({max: 0.99, precision: 0.01}),
    discount: faker.datatype.number({max: 0.99, precision: 0.01}),
    workingDays: faker.datatype.number(),
    inventory: faker.datatype.number(),
    moq: faker.datatype.number(),
    leadTime: faker.datatype.number(),
});

@Injectable()
export class BigQueryService {
    private bigQuery: BigQuery
    
    constructor() {
        this.bigQuery = new BigQuery()
    }

    async query() {
        return range(1, 400).map(() => createMockPlanItem())
        // return this.bigQuery.query(query).then(([rows]) => rows);
    }
}
