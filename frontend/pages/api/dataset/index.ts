import type { NextApiRequest, NextApiResponse } from 'next';

import { BigQuery } from '@google-cloud/bigquery';

import type { Entity } from '../../../common/bigquery';

export const listDatasets = async (): Promise<Entity[]> => {
    const client = new BigQuery();

    return client
        .getDatasets()
        .then(([datasets]) => datasets)
        .then((datasets) => datasets.map(({ id }) => <Entity>{ id }));
};

const handler = (
    req: NextApiRequest,
    res: NextApiResponse<{ datasets: Entity[] }>
) => {
    listDatasets()
        .then((datasets) => res.json({ datasets }))
        .catch(() => res.json({ datasets: [] }));
};

export default handler;
