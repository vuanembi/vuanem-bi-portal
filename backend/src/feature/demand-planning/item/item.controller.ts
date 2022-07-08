import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ItemService } from './item.service';

@ApiTags('Demand Planning / Item')
@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    async sync() {
        return this.itemService.sync();
    }

    @Get()
    async findAll() {
        return this.itemService.findAll().then((items) => items.slice(0, 10));
    }
}
