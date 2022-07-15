import {
    Entity,
    Property,
    Formula,
    OneToOne,
    ManyToOne,
    OneToMany,
    Collection,
    IdentifiedReference,
    Cascade,
} from '@mikro-orm/core';

import { Record } from '../../common/entity';

import { Item } from '../../netsuite/item/item.entity';
import { Plan } from '../plan/plan.entity';
import { PlanItemSeed } from './plan-item-seed.entity';
import { PlanItemForecast } from './plan-item-forecast.entity';
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

    @OneToOne({
        entity: () => PlanItemSeed,
        mappedBy: ({planItem}) => planItem,
        eager: true,
        owner: true,
        wrappedReference: true,
    })
    seed: IdentifiedReference<PlanItemSeed>

    @OneToOne({
        entity: () => PlanItemForecast,
        mappedBy: ({planItem}) => planItem,
        eager: true,
        owner: true,
        wrappedReference: true,
        nullable: true,
    })
    forecast: IdentifiedReference<PlanItemForecast>

    @ManyToOne({
        entity: () => Item,
        eager: true,
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
        eager: true,
        mappedBy: (itemVendor) => itemVendor.planItem,
        cascade: [Cascade.PERSIST, Cascade.REMOVE],
    })
    vendors = new Collection<PlanItemVendor>(this);
}
