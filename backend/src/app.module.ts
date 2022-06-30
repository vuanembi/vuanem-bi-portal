import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './provider/database/database.module';
import { PlanModule } from './feature/plan/plan.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        PlanModule,
    ],
})
export class AppModule {}
