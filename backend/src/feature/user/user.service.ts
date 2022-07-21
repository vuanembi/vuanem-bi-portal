import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { User } from './user.entity';

import { Feature } from './feature.entity';

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

    async upsert(id: number, email: string, features: Feature[]) {
        return this.userRepository
            .findOneOrFail({ id })
            .catch(() => {
                const user = this.userRepository.create({
                    id,
                    email,
                });
                this.userRepository.persist(user);
                return user;
            })
            .then((user) => {
                this.userRepository.assign(user, {
                    feature: features,
                });
                return user;
            });
    }

    async seed(features: Feature[]) {
        const userDtos = [
            {
                id: 1,
                email: 'bi@vuanem.com',
                feature: features,
            },
        ];
        const users = await Promise.all(
            userDtos.map((userDto) =>
                this.upsert(userDto.id, userDto.email, features),
            ),
        );
        await this.userRepository.persistAndFlush(users);
        return users;
    }
}
