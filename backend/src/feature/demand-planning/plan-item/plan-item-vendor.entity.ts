import {
    Entity,
    Property,
    ManyToOne,
    IdentifiedReference,
    Cascade,
} from '@mikro-orm/core';

import { SubRecord } from '../../../feature/common/entity';
import { Vendor } from '../../netsuite/vendor/vendor.entity';
import { PlanItem } from './plan-item.entity';

@Entity()
export class PlanItemVendor extends SubRecord {
    @Property()
    allocation: number;

    @ManyToOne({
        primary: true,
        eager: true,
        entity: () => Vendor,
        nullable: false,
        wrappedReference: true,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    vendor: IdentifiedReference<Vendor>;

    @ManyToOne({
        primary: true,
        entity: () => PlanItem,
        nullable: false,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    planItem: PlanItem;
}
