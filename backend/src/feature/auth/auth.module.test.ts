import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../provider/database/database.module';
import { AuthModule } from './auth.module';
import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth/google-auth.service';

jest.setTimeout(60_000);

describe('Auth', () => {
    let moduleRef: TestingModule;
    let authService: AuthService;
    let googleAuthService: GoogleAuthService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [DatabaseModule, UserModule, AuthModule],
        }).compile();

        authService = moduleRef.get(AuthService);
        googleAuthService = moduleRef.get(GoogleAuthService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe('Auth', () => {
        it('Sign', async () => {
            const userId = 1;
            const jwt = authService.getJwt(userId);
            console.log(jwt);
            return authService
                .getUserFromAuthenticationToken(jwt)
                .then((user) => {
                    expect(user.id).toBe(1);
                });
        });
    });

    describe('Google Auth', () => {
        it('Authenticate', async () => {
            const token = `ya29.A0AVA9y1snoVXuCZwwHbHrx0doXyHg9aaFla80z1u5atAk1uOlQQp2xarwxgfYMviu-XfTdDdta57xpHbqIjmqApaMWW43E3uoaUyvoYBtJMb9I7WrU5p5HbbdkYVqPxi3bRWpVYKenRfYvw2qSXih-1daqHQ7YUNnWUtBVEFTQVRBU0ZRRTY1ZHI4RUJmNkFlUHZGcWdXd216dzBxbERpUQ0163`;

            return googleAuthService.authenticate(token).then((user) => {
                expect(user).toBeTruthy();
            });
        });
    });
});
