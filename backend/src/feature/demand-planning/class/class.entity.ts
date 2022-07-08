import { Entity, Property } from '@mikro-orm/core'

import { Dimension } from '../../common/entity';

@Entity()
export class Class extends Dimension {
    @Property()
    name: string;
}
