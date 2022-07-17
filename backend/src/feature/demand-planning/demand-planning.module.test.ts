import { Test, TestingModule } from '@nestjs/testing';

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
            return planService.create(options).then((plan) => {
                expect(plan).toBeTruthy();
            });
        });

        it('Find All', async () => {
            return planService.findAll().then((plans) => {
                console.log(plans);
                expect(plans.length).toBeGreaterThan(0)
            })
        })

        it('Find One Item', async () => {
            const id = 8;
            return planService.findOneItems(id).then((planItems) => {
                console.log(planItems);
                expect(planItems.length).toBeGreaterThan(0);
            });
        });

        it('Forecast', async () => {
            return planService.forecast(5).then((plan) => {
                expect(plan).toBeTruthy();
            });
        });
    });
});
