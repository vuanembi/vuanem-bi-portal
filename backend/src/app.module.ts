import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './provider/database/database.module';
import { PlanModule } from './feature/plan/plan.module';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, PlanModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
