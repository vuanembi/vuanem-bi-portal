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
        return this.getOneByEmail(email)
            .catch(() => this.create(email))
            .then((user) => user);
    }

    getOne(id: number) {
        return this.userRepository.findOneOrFail({ id });
    }

    getOneByEmail(email: string) {
        return this.userRepository.findOneOrFail({ email });
    }
}
