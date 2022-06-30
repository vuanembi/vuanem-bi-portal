import { Injectable } from '@nestjs/common';

import { BigQueryProvider } from '../../../provider/warehouse/bigquery.service';
import { StorageProvider } from '../../../provider/storage/storage.service';

import { CreateTableExportDto } from './table.dto';

@Injectable()
export class TableService {
    constructor(
        private bigQueryProvider: BigQueryProvider,
        private storageProvider: StorageProvider,
    ) {}

    async export(createTableExportDto: CreateTableExportDto) {
        const id = this.storageProvider.generateId();

        return Promise.all([
            this.storageProvider.createFile(id),
            this.bigQueryProvider.createDestinationTable(
                id,
                createTableExportDto,
            ),
        ]).then(([[file, url], destination]) =>
            destination.extract(file, { location: 'us' }).then(() => url),
        );
    }
}
