import { Entity, Column, ManyToOne } from 'typeorm';

import { EntityMeta } from '../../common/entity';

import { Plan } from '../plan/plan.entity';

class Item {
    @Column()
    sku: string;

    @Column()
    startOfWeek: Date;

    @Column()
    region: string;

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
    @Column({ nullable: true })
    qtyDemandML: number | null;

    @Column({ nullable: true })
    qtyDemandPurchasing: number | null;

    @Column({ nullable: true })
    qtyDemand: number | null;

    @Column({ nullable: true })
    qtySupply: number | null;
}

@Entity()
export class PlanItem extends EntityMeta {
    @ManyToOne(() => Plan, ({ items }) => items, { cascade: true })
    plan: Plan;

    @Column(() => Item)
    item: Item;

    @Column(() => Forecast)
    forecast: Forecast;
}
