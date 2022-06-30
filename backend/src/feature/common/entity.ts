import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

export class EntityMeta {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn({type: 'timestamptz'})
    deletedAt: boolean;

    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;
}
