import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Options } from '@mikro-orm/core';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
    type: 'postgresql',
    dbName: configService.get('PG_DB'),
    user: configService.get('PG_USER'),
    password: configService.get('PG_PASSWORD'),
    host: configService.get('PG_HOST'),
    port: 5432,
    persistOnCreate: true,
    entities: [__dirname + '/../../**/*.entity.js'],
    entitiesTs: [__dirname + '/../../**/*.entity.ts'],
    migrations: {
        path: process.cwd() + '/migrations',
        glob: '!(*.d).{js,ts}',
        transactional: true,
        emit: 'ts',
    },
};

export default MikroOrmConfig;

@Module({
    imports: [MikroOrmModule.forRoot(MikroOrmConfig)],
})
export class DatabaseModule {}
