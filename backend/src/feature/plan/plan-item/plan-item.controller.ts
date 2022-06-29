import { Controller, Get, Put, Param, Query, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlanItemService } from '../plan-item/plan-item.service';
import { GetDto, UpdatePlanItemDto } from '../plan-item/plan-item.dto';

@ApiTags('Plan Item')
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
    update(@Param('id') id: string, @Body() body: UpdatePlanItemDto) {
        return this.planItemService.update(+id, body);
    }
}
