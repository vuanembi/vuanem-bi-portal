import { Entity, Property } from '@mikro-orm/core';

import { Dimension } from '../common/entity';

@Entity()
export class Feature extends Dimension {
    @Property()
    name: string;
}
