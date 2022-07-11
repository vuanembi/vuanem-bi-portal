import {
    Entity,
    Property,
    ManyToOne,
    IdentifiedReference,
    Cascade,
} from '@mikro-orm/core';

import { Vendor } from '../../netsuite/vendor/vendor.entity';
import { PlanItem } from './plan-item.entity';

@Entity()
export class PlanItemVendor {
    @Property()
    allocation: number;

    @ManyToOne({
        primary: true,
        entity: () => Vendor,
        nullable: false,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    vendor: IdentifiedReference<Vendor>;

    @ManyToOne({
        primary: true,
        entity: () => PlanItem,
        nullable: false,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    planItem: IdentifiedReference<PlanItem>;
}
