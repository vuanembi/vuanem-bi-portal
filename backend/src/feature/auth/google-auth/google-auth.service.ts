import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';

import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleAuthService {
    oauthClient: Auth.OAuth2Client;

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        this.oauthClient = new google.auth.OAuth2(
            this.configService.get('GOOGLE_CLIENT_ID'),
            this.configService.get('GOOGLE_CLIENT_SECRET'),
        );
    }

    async authenticate(token: string) {
        return this.oauthClient
            .getTokenInfo(token)
            .then(({ email }) => this.userService.findOrCreateUser(email));
    }
}
