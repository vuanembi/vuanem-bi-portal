import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

import { Record } from '../../common/entity';

@Entity()
export class Vendor {
    @PrimaryKey()
    id: number;
    
    @Property()
    name: string;
}
