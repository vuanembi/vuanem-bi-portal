import {
    Entity,
    Property,
    Formula,
    ManyToOne,
    OneToMany,
    Collection,
    IdentifiedReference,
    Cascade,
} from '@mikro-orm/core';

import { Record } from '../../common/entity';

import { Item } from '../../netsuite/item/item.entity';
import { Plan } from '../plan/plan.entity';
import { PlanItemVendor } from './plan-item-vendor.entity';

@Entity()
export class PlanItem extends Record {
    @Property()
    startOfWeek: Date;

    @Formula(`date_part('week', start_of_week)`)
    weekNo: number;

    @Formula(`date_part('year', start_of_week)`)
    year: number;

    @Property()
    region: string;

    @Property({ columnType: 'float' })
    avgItemDiscount: number;

    @Property({ columnType: 'float' })
    avgOrderDiscount: number;

    @Property()
    basePrice: number;

    @Property()
    workingDays: number;

    @Property({ nullable: true })
    qtyDemandML: number | null;

    @Property({ nullable: true })
    qtyDemandPurchasing: number | null;

    @ManyToOne({
        entity: () => Item,
        nullable: false,
        wrappedReference: true,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    item: IdentifiedReference<Item>;

    @ManyToOne({
        entity: () => Plan,
        nullable: false,
        wrappedReference: true,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    plan: IdentifiedReference<Plan>;

    @OneToMany({
        entity: () => PlanItemVendor,
        mappedBy: (itemVendor) => itemVendor.planItem,
    })
    vendor = new Collection<PlanItemVendor>(this);
}
