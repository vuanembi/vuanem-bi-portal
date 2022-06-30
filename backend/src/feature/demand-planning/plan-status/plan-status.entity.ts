import { Entity, Column } from 'typeorm';

import { EntityMeta } from '../../common/entity';

export enum StatusEnum {
    DRAFT = 'draft',
    FORECASTED = 'forecasted',
    REVIEWED = 'reviewed',
}

@Entity()
export class PlanStatus extends EntityMeta {
    @Column()
    name: string;
}
