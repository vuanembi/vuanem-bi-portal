import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';

import { GoogleAuthService } from './google-auth/google-auth.service';
import { TokenDto } from './google-auth/token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly googleAuthService: GoogleAuthService) {}

    @Post('google')
    async authenticate(@Body() tokenData: TokenDto, @Req() request: Request) {
        const user = await this.googleAuthService.authenticate(tokenData.token);

        // request.res.setHeader('Set-Cookie', [
        //     accessTokenCookie,
        //     refreshTokenCookie,
        // ]);

        return user;
    }
}
