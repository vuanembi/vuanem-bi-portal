import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlanService } from './plan.service';
import { CreatePlanDto } from './plan.dto';

@ApiTags('Demand Planning / Plan')
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

    @Put(':id/forecast')
    forecast(@Param('id') id: string) {
        return this.planService.forecast(+id);
    }

    @Put(':id/review')
    review(@Param('id') id: string) {
        return this.planService.review(+id);
    }
}
