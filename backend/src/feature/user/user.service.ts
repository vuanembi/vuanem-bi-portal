import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
    ) {}

    async create(email: string) {
        const user = this.userRepository.create({ email });
        return this.userRepository.persistAndFlush(user).then(() => user);
    }

    async findOrCreateUser(email: string) {
        return this.findOneByEmail(email)
            .catch(() => this.create(email))
            .then((user) => user);
    }

    findOne(id: number) {
        return this.userRepository.findOneOrFail({ id });
    }

    findOneByEmail(email: string) {
        return this.userRepository.findOneOrFail({ email });
    }
}
