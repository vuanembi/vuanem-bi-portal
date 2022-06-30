import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { VendorService } from './vendor.service';

@ApiTags('Vendor')
@Controller('vendor')
export class VendorController {
    constructor(private readonly vendorService: VendorService) {}

    @Post()
    async sync() {
        return this.vendorService.sync().then(() => this.findAll());
    }

    @Get()
    async findAll() {
        return this.vendorService
            .findAll()
            .then((vendors) => vendors.slice(0, 10));
    }
}
