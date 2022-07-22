import {
    Entity,
    Property,
    Formula,
    ManyToOne,
    OneToMany,
    Collection,
    IdentifiedReference,
    Cascade,
    DateType,
} from '@mikro-orm/core';

import { Record } from '../../common/entity';

import { Class } from '../../netsuite/class/class.entity';
import { Plan } from '../plan/plan.entity';
import { PlanItemVendor } from './plan-item-vendor.entity';

@Entity()
export class PlanItem extends Record {

    @Property()
    width: number;

    @Property()
    length: number;

    @Property()
    thickness: number;

    @Property({type: DateType})
    startOfWeek: Date;

    @Formula(`date_part('week', start_of_week)`)
    weekNo: number;

    @Formula(`date_part('year', start_of_week)`)
    year: number;

    @Property()
    region: string;

    // Seed

    @Property({ type: 'float' })
    avgItemDiscount: number;

    @Property({ type: 'float' })
    avgOrderDiscount: number;

    @Property()
    basePrice: number;

    @Property()
    workingDays: number;

    // Forecast

    @Property({ type: 'float' })
    qtyL1w: number;

    @Property({ type: 'float' })
    qtyL4w: number;

    @Property({ type: 'float' })
    qtyL8w: number;

    @Property()
    qtyDemandML: number = 0;

    @Property()
    qtyDemandPurchasing: number = 0;

    @Formula('qty_demand_ml / nullif(qty_l1w, 0)')
    percentageChangeL1w: number;

    @Formula('qty_demand_ml / nullif(qty_l4w, 0)')
    percentageChangeL4w: number;

    @Formula('qty_demand_ml / nullif(qty_l8w, 0)')
    percentageChangeL8w: number;

    // Inventory

    @Property()
    seedingInventory: number;

    @Property()
    qtyBackOrder: number;

    @Property()
    qtyCommitted: number;

    @Property()
    qtyOnOrder: number;

    @Property()
    safetyStockLevelInDays: number;

    @ManyToOne({
        entity: () => Class,
        eager: true,
        nullable: false,
        wrappedReference: true,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    class: IdentifiedReference<Class>;

    @ManyToOne({
        entity: () => Plan,
        nullable: false,
        wrappedReference: true,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    plan: IdentifiedReference<Plan>;

    @OneToMany({
        entity: () => PlanItemVendor,
        eager: true,
        mappedBy: (itemVendor) => itemVendor.planItem,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    vendors = new Collection<PlanItemVendor>(this);
}
