import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { EntityMeta } from '../../common/entity';

import { PlanItem } from '../plan-item/plan-item.entity';
import { Vendor } from '../vendor/vendor.entity';
import { PlanStatus } from '../plan-status/plan-status.entity';

@Entity()
export class Plan extends EntityMeta {
    @Column({ type: 'date' })
    startOfForecastWeek: Date;

    @Column()
    name: string;

    @ManyToOne(() => Vendor, ({ id }) => id, { eager: true })
    vendor: Vendor;

    @ManyToOne(() => PlanStatus, ({ id }) => id, { eager: true })
    status: PlanStatus;

    @OneToMany(() => PlanItem, ({ plan }) => plan, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    items: PlanItem[];
}
