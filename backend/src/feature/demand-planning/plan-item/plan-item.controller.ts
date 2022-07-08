import { Controller, Put, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlanItemService } from './plan-item.service';
import { UpdatePlanItemDto } from './plan-item.dto';

@ApiTags('Demand Planning / Plan Item')
@Controller('plan-item')
export class PlanItemController {
    constructor(private readonly planItemService: PlanItemService) {}

    @Put(':id')
    update(@Param('id') id: string, @Body() body: UpdatePlanItemDto) {
        return this.planItemService.update(+id, body);
    }
}
