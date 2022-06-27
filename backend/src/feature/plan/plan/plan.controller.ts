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

@Controller('plan')
export class PlanController {
    constructor(private readonly planService: PlanService) {}

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
