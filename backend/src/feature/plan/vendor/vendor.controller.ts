import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { VendorService } from './vendor.service';

@ApiTags('Plan Vendor')
@Controller('plan-vendor')
export class PlanItemVendorController {
    constructor(private readonly vendorService: VendorService) {}

    @Get()
    findAll() {
        return this.vendorService.findAll();
    }
}
