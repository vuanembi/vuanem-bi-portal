import { Property, PrimaryKey } from '@mikro-orm/core';

export class Record {
    @PrimaryKey()
    id!: number;

    @Property({ columnType: 'timestamptz' })
    deletedAt: boolean;

    @Property({ columnType: 'timestamptz' })
    createdAt: Date = new Date();

    @Property({ columnType: 'timestamptz', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
