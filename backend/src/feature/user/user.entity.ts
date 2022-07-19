import {
    Entity,
    Property,
    IdentifiedReference,
    ManyToOne,
    Cascade,
} from '@mikro-orm/core';

import { Record } from '../common/entity';
import { Feature } from './feature.entity';

@Entity()
export class User extends Record {
    @Property()
    email: string;

    @ManyToOne({
        entity: () => Feature,
        eager: true,
        nullable: false,
        wrappedReference: true,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    module: IdentifiedReference<Feature>;
}
