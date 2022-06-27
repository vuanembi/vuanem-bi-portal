import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { EntityMeta } from '../../common/entity';

import { PlanItem } from '../plan-item/plan-item.entity';
import { PlanStatus } from '../plan-status/plan-status.entity';

@Entity()
export class Plan extends EntityMeta {
    @Column({ type: 'date' })
    startOfForecastWeek: Date;

    @Column()
    name: string;

    @ManyToOne(() => PlanStatus, ({ name }) => name)
    status: PlanStatus;

    @OneToMany(() => PlanItem, ({ plan }) => plan)
    items: PlanItem[];
}
