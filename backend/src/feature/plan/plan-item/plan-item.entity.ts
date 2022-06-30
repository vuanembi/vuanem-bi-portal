import { Entity, Column, ManyToOne } from 'typeorm';

import { EntityMeta } from '../../common/entity';

import { Plan } from '../plan/plan.entity';
import { Vendor } from '../vendor/vendor.entity';

@Entity()
export class PlanItem extends EntityMeta {
    @ManyToOne(() => Plan, ({ items }) => items)
    plan: Plan;

    // Item

    @ManyToOne(() => Vendor, ({ id }) => id)
    vendor: Vendor;

    @Column()
    sku: string;

    @Column()
    startOfWeek: Date;

    @Column()
    region: string;

    @Column({ type: 'float' })
    avgItemDiscount: number;

    @Column({ type: 'float' })
    avgOrderDiscount: number;

    @Column({ type: 'float' })
    discount: number;

    @Column()
    workingDays: number;

    @Column()
    inventory: number;

    @Column()
    moq: number;

    @Column()
    leadTime: number;

    // Forecast

    @Column({ nullable: true })
    qtyDemandML: number | null;

    @Column({ nullable: true })
    qtyDemandPurchasing: number | null;

    @Column({ nullable: true })
    qtyDemand: number | null;

    @Column({ nullable: true })
    qtySupply: number | null;
}
