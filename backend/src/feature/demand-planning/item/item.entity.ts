import { Entity, Property, ManyToOne, ManyToMany } from '@mikro-orm/core';

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
    height: number;

    @Property()
    thickness: number;

    @ManyToOne(() => Class)
    class: Class[];

    @ManyToMany(() => Vendor)
    vendor: Vendor[];
}
