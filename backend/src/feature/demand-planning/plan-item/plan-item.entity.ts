import { Entity, Property, ManyToOne, Cascade } from '@mikro-orm/core';

import { Record } from '../../common/entity';

import { Item } from '../../netsuite/item/item.entity';
import { Plan } from '../plan/plan.entity';

@Entity()
export class PlanItem extends Record {
    @Property()
    startOfWeek: Date;

    @Property()
    region: string;

    @Property({ columnType: 'float' })
    avgItemDiscount: number;

    @Property({ columnType: 'float' })
    avgOrderDiscount: number;

    @Property({ columnType: 'float' })
    discount: number;

    @Property()
    workingDays: number;

    @Property()
    inventory: number;

    @Property()
    moq: number;

    @Property()
    leadTime: number;

    @Property({ nullable: true })
    qtyDemandML: number | null;

    @Property({ nullable: true })
    qtyDemandPurchasing: number | null;

    @Property({ nullable: true })
    qtyDemand: number | null;

    @Property({ nullable: true })
    qtySupply: number | null;

    @ManyToOne({
        entity: () => Item,
        nullable: false,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    item: Item;
    
    @ManyToOne({
        entity: () => Plan,
        nullable: false,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    plan: Plan;
}
