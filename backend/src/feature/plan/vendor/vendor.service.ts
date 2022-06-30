import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vendor } from './vendor.entity';

@Injectable()
export class VendorService {
    constructor(
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
    ) {}

    findAll() {
        return this.vendorRepository.find();
    }
}
