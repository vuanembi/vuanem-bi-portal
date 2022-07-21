import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { User } from './user.entity';
import { UserService } from './user.service';

import { Feature } from './feature.entity';
import { FeatureService } from './feature.service';

@Injectable()
export class UserSeeder extends Seeder {
    async run(em: EntityManager) {
        const userService = new UserService(em.getRepository(User));
        const featureService = new FeatureService(em.getRepository(Feature));

        await featureService
            .seed()
            .then((features) => userService.seed(features));
    }
}
