import { Module } from '@nestjs/common';

import { BigQueryProvider } from '../../provider/warehouse/bigquery.service';

import { DatasetService } from './dataset/dataset.service';
import { DatasetController } from './dataset/dataset.controller';

@Module({
    providers: [BigQueryProvider, DatasetService],
    controllers: [DatasetController],
})
export class DataServiceModule {}
