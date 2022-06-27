import { Entity, Column } from 'typeorm';

import { EntityMeta } from 'src/feature/common/entity';

export enum RegionEnum {
    NORTH = 'North',
    MIDDLE = 'Middle',
    SOUTH = 'South',
}

@Entity()
export class PlanItemRegion extends EntityMeta {
    @Column({
        type: 'enum',
        enum: RegionEnum,
    })
    region: PlanItemRegion;
}
