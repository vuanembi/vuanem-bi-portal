import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';

import { PlanService } from './plan.service';
import { CreatePlan } from './plan.dto';

@Controller('plan')
export class PlanController {
    constructor(private readonly planService: PlanService) {}

    @Post()
    create(@Body() createPlanDto: CreatePlan) {
        return this.planService.create(createPlanDto);
    }

    @Get()
    findAll() {
        return this.planService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.planService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.planService.remove(+id);
    }
}
