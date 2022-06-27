import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common/entity';

import { Plan } from '../plan/plan.entity';
import { PlanStatus } from '../plan-status/plan-status.entity';
import { PlanRegion } from './plan-region.entity';

class Item {
    @Column()
    sku: string;

    @Column()
    startOfWeek: Date;

    @ManyToOne(() => PlanRegion, ({ region }) => region)
    region: PlanRegion;

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
export class PlanItem extends BaseEntity {
    @ManyToOne(() => PlanStatus, ({ status }) => status)
    status: PlanStatus;

    @ManyToOne(() => Plan, ({ items }) => items)
    plan: Plan;

    @Column(() => Item)
    item: Item;

    @Column(() => Forecast)
    forecast: Forecast;
}
