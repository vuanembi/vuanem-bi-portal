import { Entity, Column } from 'typeorm';

import { EntityMeta } from 'src/feature/common/entity';

export enum StatusEnum {
    DRAFT = 'draft',
    FORECASTED = 'forecasted',
    REVIEWED = 'reviewed',
}

@Entity()
export class PlanStatus extends EntityMeta {
    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.DRAFT,
        unique: true,
    })
    name: PlanStatus;
}
