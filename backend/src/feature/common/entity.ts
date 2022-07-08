import { Property, PrimaryKey } from '@mikro-orm/core';

export class Record {
    @PrimaryKey()
    id!: number;

    @Property({ columnType: 'timestamptz', nullable: true })
    deletedAt: boolean;

    @Property({ columnType: 'timestamptz' })
    createdAt: Date = new Date();

    @Property({ columnType: 'timestamptz', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

export class Dimension {
    @PrimaryKey()
    id: number;
}
