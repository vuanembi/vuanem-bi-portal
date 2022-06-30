import { Injectable } from '@nestjs/common';
import { Storage, File } from '@google-cloud/storage';
import { faker } from '@faker-js/faker';
import { capitalize } from 'lodash';

@Injectable()
export class StorageProvider {
    public client: Storage;
    private exportBucket = 'vuanem-export';

    constructor() {
        this.client = new Storage();
    }

    generateId() {
        const char = faker.commerce
            .productName()
            .split(' ')
            .map((i) => capitalize(i))
            .join('');
        const num = faker.datatype.number({ min: 1000, max: 9999 });

        return `${char}${num}`;
    }

    async createFile(id: string): Promise<[File, string]> {
        const file = this.client.bucket(this.exportBucket).file(`${id}.csv`);

        return file
            .getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 15 * 60 * 1000,
            })
            .then(([url]) => [file, url]);
    }
}
