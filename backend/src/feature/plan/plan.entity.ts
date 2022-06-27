import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../common/entity';

import { PlanItem } from '../plan-item/plan-item.entity';

export enum PlanStatus {
    DRAFT = "draft",
    FORECASTED = "forecasted",
    REVIEWED = "reviewed",
}

@Entity()
export class Plan extends BaseEntity {
    @Column()
    startOfForecastWeek: Date;

    @Column({
        type: "enum",
        enum: PlanStatus,
        default: PlanStatus.DRAFT
    })
    status: PlanStatus;

    @OneToMany(() => PlanItem, ({ plan }) => plan)
    items: PlanItem[];
}
