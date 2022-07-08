import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

import { EntityMeta } from '../../common/entity'; 
import { Class } from '../class/class.entity';
import { Vendor } from '../vendor/vendor.entity';

@Entity()
export class Item extends EntityMeta {
    @Column()
    name: string;

    @ManyToOne(() => Class)
    class: Class[]

    @ManyToMany(() => Vendor)
    @JoinTable()
    vendor: Vendor[]

}
