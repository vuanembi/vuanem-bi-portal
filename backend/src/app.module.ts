import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { DatabaseModule } from './provider/database/database.module';

import { PlanModule } from './feature/plan/plan.module';
import { DataServiceModule } from './feature/data-service/data-service.module';

const routes = [
    {
        path: 'demand-planning',
        module: PlanModule,
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
