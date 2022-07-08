import {
    Entity,
    Property,
    ManyToOne,
    ManyToMany,
    Collection,
} from '@mikro-orm/core';

import { Dimension } from '../../common/entity';
import { Class } from '../class/class.entity';
import { Vendor } from '../vendor/vendor.entity';

@Entity()
export class Item extends Dimension {
    @Property()
    sku: string;

    @Property()
    name: string;

    @Property()
    width: number;

    @Property()
    length: number;

    @Property()
    thickness: number;

    @ManyToOne({ entity: () => Class, eager: true })
    class: Class;

    @ManyToMany(() => Vendor)
    vendor = new Collection<Vendor>(this);
}
