import { Entity, Property, OneToOne } from '@mikro-orm/core';

import { SubRecord } from '../../common/entity';

import { PlanItem } from './plan-item.entity';

@Entity()
export class PlanItemSeed extends SubRecord {
    @Property({ type: 'float' })
    avgItemDiscount: number;

    @Property({ type: 'float' })
    avgOrderDiscount: number;

    @Property()
    basePrice: number;

    @Property()
    workingDays: number;

    @OneToOne({
        entity: () => PlanItem,
        mappedBy: ({ seed }) => seed,
    })
    planItem: PlanItem;
}
