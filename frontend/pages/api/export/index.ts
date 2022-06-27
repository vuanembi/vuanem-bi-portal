import { setTimeout } from 'timers/promises';
import type { NextApiRequest, NextApiResponse } from 'next';

import { BigQuery, Job } from '@google-cloud/bigquery';
import { Storage, File } from '@google-cloud/storage';
import { faker } from '@faker-js/faker';
import { capitalize } from 'lodash';
import dayjs from 'dayjs';

const tempBucket = 'vuanem-export';
const tempDatasetId = 'temp_Export';

export const generateId = () => {
    const char = faker.commerce
        .productName()
        .split(' ')
        .map((i) => capitalize(i))
        .join('');
    const num = faker.datatype.number({ min: 1000, max: 9999 });

    return `${char}${num}`;
};

const createFile = async (id: string): Promise<[File, string]> => {
    const storage = new Storage();

    const file = storage.bucket(tempBucket).file(`${id}.csv`);
    return file
        .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000,
        })
        .then(([url]) => [file, url]);
};

const pollJob = (job: Job): Promise<Job> =>
    job.metadata.status.state === 'RUNNING'
        ? setTimeout(1000)
              .then(() => job.get())
              .then(([job]) => pollJob(job))
        : Promise.resolve(job);

const createDestinationTable = async (
    id: string,
    dataset: string,
    table: string
) => {
    const bigquery = new BigQuery();

    const tempDataset = bigquery.dataset(tempDatasetId);

    const destination = await tempDataset
        .createTable(id, {
            location: 'us',
            expirationTime: dayjs().add(5, 'minutes').valueOf().toString(),
        })
        .then(() => tempDataset.table(id));

    await bigquery
        .createQueryJob({
            query: `SELECT * FROM ${dataset}.${table}`,
            location: 'us',
            destination,
        })
        .then(([job]) => pollJob(job));

    return destination;
};

export const createExportJob = async (dataset: string, table: string) => {
    const id = generateId();

    return Promise.all([
        createFile(id),
        createDestinationTable(id, dataset, table),
    ]).then(async ([fileData, destination]) => {
        const [file, url] = fileData;
        return destination.extract(file, { location: 'us' }).then(() => url);
    });
};

const handler = (
    req: NextApiRequest,
    res: NextApiResponse<{ url: string }>
) => {
    if (req.method !== 'POST') {
        res.status(405).end();
    }

    const { dataset, table }: { dataset?: string; table?: string } = req.body;

    if (!dataset || !table) {
        res.status(400).end();
        return;
    }

    createExportJob(dataset, table)
        .then((url) => res.json({ url }))
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
};

export default handler;
