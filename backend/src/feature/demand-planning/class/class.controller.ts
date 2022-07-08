import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClassService } from './class.service';

@ApiTags('Demand Planning / Class')
@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Post()
    async sync() {
        return this.classService.sync().then(() => this.findAll());
    }

    @Get()
    async findAll() {
        return this.classService
            .findAll()
            .then((classes) => classes.slice(0, 10));
    }
}
