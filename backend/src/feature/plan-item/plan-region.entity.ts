import { Entity, Column } from 'typeorm';

export enum RegionEnum {
    NORTH = 'North',
    MIDDLE = 'Middle',
    SOUTH = 'South',
}

@Entity()
export class PlanRegion {
    @Column({
        type: 'enum',
        enum: RegionEnum,
    })
    region: PlanRegion;
}
