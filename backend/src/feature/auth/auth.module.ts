import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { GoogleAuthService } from './google-auth/google-auth.service';

@Module({
    imports: [
        UserModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                },
            }),
        }),
    ],
    providers: [AuthService, GoogleAuthService],
    controllers: [AuthController],
})
export class AuthModule {}
