import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTableExportDto } from './table.dto';
import { TableService } from './table.service';

@ApiTags('Data Service / Table / Export')
@Controller('table/export')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post()
    export(@Body() createTableExportDto: CreateTableExportDto) {
        return this.tableService.export(createTableExportDto);
    }
}
