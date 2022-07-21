import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../provider/database/database.module';
import { UserModule } from '../user/user.module';

import { UserService } from './user.service';

jest.setTimeout(60_000);

describe('Auth', () => {
    let moduleRef: TestingModule;
    let userService: UserService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [DatabaseModule, UserModule],
        }).compile();

        userService = moduleRef.get(UserService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe('User Service', () => {
        it('Find One', async () => {
            const userId = 1;
            return userService.findOne(userId).then((user) => {
                console.log(user);
                expect(user).toBeTruthy();
            });
        });
    });
});
