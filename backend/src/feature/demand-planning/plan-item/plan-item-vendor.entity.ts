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
    @Property({ type: 'float' })
    allocation: number;

    @ManyToOne({
        eager: true,
        entity: () => Vendor,
        nullable: false,
        wrappedReference: true,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    vendor: IdentifiedReference<Vendor>;

    @ManyToOne({
        entity: () => PlanItem,
        nullable: false,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    planItem: PlanItem;
}
