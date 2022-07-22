import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../provider/database/database.module';
import { NetSuiteModule } from '../netsuite/netsuite.module';
import { DemandPlanningModule } from './demand-planning.module';

import { PlanService } from './plan/plan.service';

jest.setTimeout(60_000);

describe('Demand Planning', () => {
    let moduleRef: TestingModule;
    let planService: PlanService;

    const planId = 1;

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
                name: 'Plan 01',
                classIds: [2805],
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
            return planService.findOneItems(planId).then((planItems) => {
                console.log(planItems);
                expect(planItems.length).toBeGreaterThan(0);
            });
        });

        it('Forecast', async () => {
            return planService.forecast(planId).then((plan) => {
                expect(plan).toBeTruthy();
            });
        });

        it('Inventory', async () => {
            return planService.checkInventory(planId).then((plan) => {
                expect(plan).toBeTruthy();
            });
        });
    });
});
