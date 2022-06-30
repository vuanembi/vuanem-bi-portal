import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlanService } from './plan.service';
import { CreatePlanDto } from './plan.dto';

@ApiTags('Plan')
@Controller('plan')
export class PlanController {
    constructor(private readonly planService: PlanService) {}

    @Post()
    create(@Body() createPlanDto: CreatePlanDto) {
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
}
