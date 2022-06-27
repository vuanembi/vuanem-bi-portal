import { Entity, Column, ManyToOne } from 'typeorm';

import { EntityMeta } from '../../common/entity';

import { Plan } from '../plan/plan.entity';
import { PlanStatus } from '../plan-status/plan-status.entity';
import { PlanItemRegion } from './plan-item-region.entity';

class Item {
    @Column()
    sku: string;

    @Column()
    startOfWeek: Date;

    @ManyToOne(() => PlanItemRegion, ({ region }) => region)
    region: PlanItemRegion;

    @Column()
    avgItemDiscount: number;

    @Column()
    avgOrderDiscount: number;

    @Column()
    discount: number;

    @Column()
    workingDays: number;

    @Column()
    inventory: number;

    @Column()
    moq: number;

    @Column()
    leadTime: number;
}

class Forecast {
    @Column()
    qtyDemandML: number;

    @Column()
    qtyDemandPurchasing: number;

    @Column()
    qtyDemand: number;

    @Column()
    qtySupply: number;
}

@Entity()
export class PlanItem extends EntityMeta {
    @ManyToOne(() => PlanStatus, ({ status }) => status)
    status: PlanStatus;

    @ManyToOne(() => Plan, ({ items }) => items)
    plan: Plan;

    @Column(() => Item)
    item: Item;

    @Column(() => Forecast)
    forecast: Forecast;
}
