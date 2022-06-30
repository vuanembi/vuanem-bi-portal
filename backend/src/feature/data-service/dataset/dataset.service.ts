import { Injectable } from '@nestjs/common';

import { BigQueryProvider } from '../../../provider/warehouse/bigquery.service';

@Injectable()
export class DatasetService {
    constructor(private bigQueryProvider: BigQueryProvider) {}

    async findAll() {
        return this.bigQueryProvider.client
            .getDatasets()
            .then(([datasets]) => datasets.map(({ id }) => ({ id })));
    }

    async findTables(id: string) {
        return this.bigQueryProvider.client
            .dataset(id)
            .getTables()
            .then(([tables]) => tables)
            .then((tables) =>
                tables.map((table) => ({
                    id: table.id,
                    type: table.metadata.type,
                })),
            );
    }
}
