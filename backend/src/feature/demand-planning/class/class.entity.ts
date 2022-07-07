import { Entity, Column } from 'typeorm';

import { EntityMeta } from '../../common/entity';

@Entity()
export class Class extends EntityMeta {
    @Column()
    name: string;
}
