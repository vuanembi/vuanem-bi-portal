import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '../../provider/database/database.module';
import { NetSuiteModule } from '../netsuite/netsuite.module';
import { DemandPlanningModule } from './demand-planning.module';

import { PlanService } from './plan/plan.service';

jest.setTimeout(60_000);

describe('Demand Planning', () => {
    let moduleRef: TestingModule;
    let planService: PlanService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                DatabaseModule,
                NetSuiteModule,
                DemandPlanningModule,
            ],
        }).compile();

        planService = moduleRef.get(PlanService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe('Plan Service', () => {
        it('Create', async () => {
            const options = {
                name: 'Aruuuu',
                sku: ['123'],
                startOfForecastWeek: new Date('2022-01-01'),
            };
            return planService.create(options).then((planItems) => {
                expect(planItems).toBeTruthy();
            });
        });
    });
});
