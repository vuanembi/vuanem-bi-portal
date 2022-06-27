import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity()
export class EntityMeta {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deletedAt: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
