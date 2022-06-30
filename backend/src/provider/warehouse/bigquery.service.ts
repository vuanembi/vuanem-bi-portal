import { setTimeout } from 'timers/promises';
import { Injectable } from '@nestjs/common';
import { BigQuery, Job } from '@google-cloud/bigquery';
import Knex from 'knex';
import dayjs from 'dayjs';

@Injectable()
export class BigQueryProvider {
    public client: BigQuery;
    public exportDataset = 'temp_Export';

    constructor() {
        this.client = new BigQuery();
    }

    build() {
        return Knex({ client: 'mysql' });
    }

    async query<T>(query: string): Promise<T[]> {
        return this.client.query(query).then(([rows]) => rows);
    }

    async createDestinationTable(id: string, { dataset, table }) {
        const pollJob = (job: Job): Promise<Job> =>
            job.metadata.status.state === 'RUNNING'
                ? setTimeout(1000)
                      .then(() => job.get())
                      .then(([job]) => pollJob(job))
                : Promise.resolve(job);

        const tempDataset = this.client.dataset(this.exportDataset);

        await tempDataset.createTable(id, {
            location: 'us',
            expirationTime: dayjs().add(5, 'minutes').valueOf().toString(),
        });

        const destination = tempDataset.table(id);

        await this.client
            .createQueryJob({
                query: this.build()
                    .withSchema(dataset)
                    .from(table)
                    .select()
                    .toQuery(),
                location: 'us',
                destination,
            })
            .then(([job]) => pollJob(job));

        return destination;
    }
}
