import {
    Entity,
    Property,
    Enum,
    Collection,
    OneToMany,
    Cascade,
} from '@mikro-orm/core';

import { Record } from '../../common/entity';
import { PlanItem } from '../plan-item/plan-item.entity';

export enum PlanStatus {
    DRAFT = 'draft',
    FORECAST = 'forecast',
    INVENTORY = 'inventory',
    REVIEW = 'review',
}

@Entity()
export class Plan extends Record {
    @Property()
    name: string;

    @Enum({ items: () => PlanStatus })
    status: PlanStatus;

    @OneToMany({
        entity: () => PlanItem,
        mappedBy: ({ plan }) => plan,
        cascade: [Cascade.ALL],
    })
    items = new Collection<PlanItem>(this);
}
