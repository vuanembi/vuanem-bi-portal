import {
    Entity,
    Property,
    Enum,
    Collection,
    OneToMany,
    ManyToOne,
} from '@mikro-orm/core';

import { Record } from '../../common/entity';
import { PlanItem } from '../plan-item/plan-item.entity';
import { Vendor } from '../vendor/vendor.entity';

export enum PlanStatus {
    DRAFT = 'draft',
    FORECASTING = 'forecasting',
    FORECASTED = 'forecasted',
    REVIEWED = 'reviewed',
}

@Entity()
export class Plan extends Record {
    @Property({ columnType: 'date' })
    startOfForecastWeek: Date;

    @Property()
    name: string;

    @Enum({ items: () => PlanStatus })
    status: PlanStatus;

    @ManyToOne(() => Vendor)
    vendor: Vendor;

    @OneToMany(() => PlanItem, ({ plan }) => plan)
    items = new Collection<PlanItem>(this);
}
