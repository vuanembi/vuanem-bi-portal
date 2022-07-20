import {
    Entity,
    Property,
    Collection,
    ManyToMany,
    Cascade,
} from '@mikro-orm/core';

import { Record } from '../common/entity';
import { Feature } from './feature.entity';

@Entity()
export class User extends Record {
    @Property()
    email: string;

    @ManyToMany({
        entity: () => Feature,
        eager: true,
        nullable: true,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    feature = new Collection<Feature>(this);
}
