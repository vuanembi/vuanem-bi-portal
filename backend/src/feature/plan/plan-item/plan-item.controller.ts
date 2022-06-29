import { Controller, Get, Put, Param, Query, Body } from '@nestjs/common';

import { PlanItemService } from '../plan-item/plan-item.service';
import { GetDto, UpdateDto } from '../plan-item/plan-item.dto';

@Controller('plan-item')
export class PlanItemController {
    constructor(private readonly planItemService: PlanItemService) {}

    @Get()
    findAll(@Query() query: GetDto) {
        return this.planItemService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.planItemService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: UpdateDto) {
        return this.planItemService.update(+id, body);
    }
}
