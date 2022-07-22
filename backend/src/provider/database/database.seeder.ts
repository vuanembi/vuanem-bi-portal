import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { UserSeeder } from '../../feature/user/user.seeder';
import { NetSuiteSeeder } from '../../feature/netsuite/netsuite.seeder';

export class DatabaseSeeder extends Seeder {
    run(em: EntityManager) {
        return this.call(em, [UserSeeder, NetSuiteSeeder]);
    }
}
