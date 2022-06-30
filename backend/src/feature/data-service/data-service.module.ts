import { Module } from '@nestjs/common';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';
import { StorageProvider } from 'src/provider/storage/storage.service';

import { DatasetService } from './dataset/dataset.service';
import { DatasetController } from './dataset/dataset.controller';

import { TableService } from './table/table.service';
import { TableController } from './table/table.controller';

@Module({
    providers: [
        BigQueryProvider,
        StorageProvider,
        DatasetService,
        TableService,
    ],
    controllers: [DatasetController, TableController],
})
export class DataServiceModule {}
