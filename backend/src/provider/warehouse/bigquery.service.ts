import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';
import Knex from 'knex';

@Injectable()
export class BigQueryProvider {
    public client: BigQuery;

    constructor() {
        this.client = new BigQuery();
    }

    build() {
        return Knex({ client: 'mysql' });
    }

    async query<T>(query: string): Promise<T[]> {
        return this.client.query(query).then(([rows]) => rows);
    }
}
