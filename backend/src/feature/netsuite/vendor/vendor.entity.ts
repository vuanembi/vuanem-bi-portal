import { Entity, Property } from '@mikro-orm/core';

import { Dimension } from '../../common/entity';

@Entity()
export class Vendor extends Dimension {
    @Property()
    name: string;
}
