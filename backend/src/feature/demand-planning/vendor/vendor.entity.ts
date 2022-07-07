import { Entity, Property } from '@mikro-orm/core';

import { Record } from '../../common/entity';

@Entity()
export class Vendor extends Record {
    @Property()
    name: string;
}
