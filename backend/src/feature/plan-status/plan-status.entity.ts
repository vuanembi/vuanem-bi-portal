import { Entity, Column } from 'typeorm';

export enum StatusEnum {
    DRAFT = 'draft',
    FORECASTED = 'forecasted',
    REVIEWED = 'reviewed',
}

@Entity()
export class PlanStatus {
    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.DRAFT,
    })
    status: PlanStatus;
}
