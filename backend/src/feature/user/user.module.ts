import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from '../user/user.entity';
import { UserService } from './user.service';

import { Feature } from '../user/feature.entity';

@Module({
    imports: [MikroOrmModule.forFeature([User, Feature])],
    providers: [UserService],
})
export class UserModule {}
