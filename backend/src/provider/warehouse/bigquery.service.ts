import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class BigQueryService {
    constructor(private bigQuery: BigQuery) {}

    async query<T>(query: string): Promise<T[]> {
        return this.bigQuery.query(query).then(([rows]) => rows);
    }
}
