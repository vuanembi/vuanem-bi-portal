import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '../../provider/database/database.module';
import { NetSuiteModule } from './netsuite.module';
import { ClassService } from './class/class.service';
import { VendorService } from './vendor/vendor.service';

jest.setTimeout(60_000);

describe('NetSuite', () => {
    let moduleRef: TestingModule;
    let classService: ClassService;
    let vendorService: VendorService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forRoot(), DatabaseModule, NetSuiteModule],
        }).compile();

        classService = moduleRef.get(ClassService);
        vendorService = moduleRef.get(VendorService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe('Class Service', () => {
        it('Sync', () =>
            classService.sync().then((count) => {
                expect(count).toBeGreaterThan(0);
            }));
    });

    describe('Vendor Service', () => {
        it('Sync', () =>
            vendorService.sync().then((count) => {
                expect(count).toBeGreaterThan(0);
            }));
    });
});
