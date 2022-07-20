import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { DatabaseModule } from './provider/database/database.module';

import { AuthModule } from './feature/auth/auth.module';
import { NetSuiteModule } from './feature/netsuite/netsuite.module';
import { DemandPlanningModule } from './feature/demand-planning/demand-planning.module';
import { DataServiceModule } from './feature/data-service/data-service.module';

const routes = [
    {
        path: 'auth',
        module: AuthModule,
    },
    {
        path: 'netsuite',
        module: NetSuiteModule,
    },
    {
        path: 'demand-planning',
        module: DemandPlanningModule,
    },
    {
        path: 'data-service',
        module: DataServiceModule,
    },
];

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        ...routes.map(({ module }) => module),
        RouterModule.register(routes),
    ],
})
export class AppModule {}
