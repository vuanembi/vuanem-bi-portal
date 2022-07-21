import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from '../user/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { Feature } from '../user/feature.entity';

@Module({
    imports: [MikroOrmModule.forFeature([User, Feature])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
