import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';
import Knex from 'knex';

@Injectable()
export class BigQueryProvider {
    private bigQuery: BigQuery;

    constructor() {
        this.bigQuery = new BigQuery();
    }

    build() {
        return Knex({ client: 'mysql' });
    }

    async query<T>(query: string): Promise<T[]> {
        return this.bigQuery.query(query).then(([rows]) => rows);
    }
}
