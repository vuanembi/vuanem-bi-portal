import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DatasetService } from './dataset.service';

@ApiTags('Data Service / Dataset')
@Controller('dataset')
export class DatasetController {
    constructor(private readonly datasetService: DatasetService) {}

    @Get()
    findAll() {
        return this.datasetService.findAll();
    }

    @Get(':id')
    findTables(@Param('id') id: string) {
        return this.datasetService.findTables(id);
    }
}
