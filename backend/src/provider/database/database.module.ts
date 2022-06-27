import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                console.log(configService.get('PG_USER'))
                return {
                    type: 'postgres',
                    host: configService.get('PG_HOST'),
                    port: 5432,
                    database:
                        process.env.NODE_ENV === 'production'
                            ? 'postgres'
                            : 'postgres-dev',
                    username: configService.get('PG_USER'),
                    password: configService.get('PG_PASSWORD'),
                    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                    synchronize: true,
                    // ssl: {
                    //     rejectUnauthorized: false,
                    // },
                    namingStrategy: new SnakeNamingStrategy(),
                };
            },
        }),
    ],
})
export class DatabaseModule {}
