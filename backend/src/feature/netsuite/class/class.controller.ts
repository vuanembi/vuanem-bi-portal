import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClassService } from './class.service';

@ApiTags('NetSuite / Class')
@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Post()
    async sync() {
        return this.classService.sync();
    }

    @Get()
    async findAll() {
        return this.classService
            .findAll()
            .then((classes) => classes.slice(0, 10));
    }
}
