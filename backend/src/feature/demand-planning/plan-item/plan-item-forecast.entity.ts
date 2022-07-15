import { Entity, Property, OneToOne } from '@mikro-orm/core';

import { SubRecord } from '../../common/entity';

import { PlanItem } from './plan-item.entity';

@Entity()
export class PlanItemForecast extends SubRecord {
    @Property({ type: 'float' })
    percentageChange1w: number;

    @Property({ type: 'float' })
    percentageChange1m: number;

    @Property({ type: 'float' })
    percentageChange3m: number;

    @Property()
    qtyDemandML: number;

    @Property()
    qtyDemandPurchasing: number;

    @OneToOne({
        entity: () => PlanItem,
        mappedBy: ({ forecast }) => forecast,
    })
    planItem: PlanItem;
}
