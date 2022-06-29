import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

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
