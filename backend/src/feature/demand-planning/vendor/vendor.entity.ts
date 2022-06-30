import { Entity, Column } from 'typeorm';

import { EntityMeta } from '../../common/entity';

@Entity()
export class Vendor extends EntityMeta {
    @Column()
    name: string;
}
