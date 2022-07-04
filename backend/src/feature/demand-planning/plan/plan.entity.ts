import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { EntityMeta } from '../../common/entity';

import { PlanItem } from '../plan-item/plan-item.entity';
import { Vendor } from '../vendor/vendor.entity';

export enum PlanStatus {
    DRAFT = 'draft',
    FORECASTING = 'forecasting',
    FORECASTED = 'forecasted',
    REVIEWED = 'reviewed',
}

@Entity()
export class Plan extends EntityMeta {
    @Column({ type: 'date' })
    startOfForecastWeek: Date;

    @Column()
    name: string;

    @ManyToOne(() => Vendor, ({ id }) => id, { eager: true })
    vendor: Vendor;

    @Column({
        type: 'enum',
        enum: PlanStatus,
        default: PlanStatus.DRAFT,
    })
    status: PlanStatus;

    @OneToMany(() => PlanItem, ({ plan }) => plan, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    items: PlanItem[];
}
