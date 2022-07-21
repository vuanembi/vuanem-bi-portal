import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { TokenDto } from './google-auth/token.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly googleAuthService: GoogleAuthService,
    ) {}

    @Post('google')
    async authenticate(
        @Body() tokenData: TokenDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.googleAuthService
            .authenticate(tokenData.token)
            .then((user) => {
                const token = this.authService.getJwt(user.id);
                res.cookie('token', token, {
                    maxAge: 3600000,
                    httpOnly: true,
                    sameSite: 'lax',
                });
                return { user, token };
            });
    }
}
