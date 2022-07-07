import 'dotenv/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PG_HOST || '',
    port: 5432,
    database: process.env.PG_DB || '',
    username: process.env.PG_USER || '',
    password: process.env.PG_PASSWORD || '',
    // synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

@Module({
    imports: [TypeOrmModule.forRoot(config)],
})
export class DatabaseModule {}

export default new DataSource(config);
