import { Property, PrimaryKey } from '@mikro-orm/core';

export abstract class Record {
    @PrimaryKey()
    id!: number;

    @Property({ columnType: 'timestamptz', nullable: true })
    deletedAt: boolean;

    @Property({ columnType: 'timestamptz' })
    createdAt: Date = new Date();

    @Property({ columnType: 'timestamptz', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

export abstract class SubRecord {
    @PrimaryKey()
    id!: number;
}

export abstract class Dimension {
    @PrimaryKey()
    id!: number;
}
