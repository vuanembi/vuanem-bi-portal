import { Entity, Property, ManyToOne, Cascade } from '@mikro-orm/core';

import { Record } from '../../common/entity';

import { Plan } from '../plan/plan.entity';

@Entity()
export class PlanItem extends Record {
    @Property()
    sku: string;

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
        entity: () => Plan,
        eager: false,
        nullable: false,
        cascade: [Cascade.REMOVE],
    })
    plan: Plan;
}
