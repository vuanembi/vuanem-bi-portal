import { Entity, PrimaryColumn, Column } from 'typeorm';

export enum StatusEnum {
    DRAFT = 'draft',
    FORECASTED = 'forecasted',
    REVIEWED = 'reviewed',
}

@Entity()
export class PlanStatus {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
