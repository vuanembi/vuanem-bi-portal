import type { NextApiRequest, NextApiResponse } from 'next';

import { BigQuery } from '@google-cloud/bigquery';

import type { Entity } from '../../../common/bigquery';

export const listTables = async (datasetId: string): Promise<Entity[]> => {
    const client = new BigQuery();

    return client
        .dataset(datasetId)
        .getTables()
        .then(([tables]) => tables)
        .then((tables) =>
            tables.map((table) => ({
                id: <string>table.id,
                type: table.metadata.type,
            }))
        );
};

const handler = (
    req: NextApiRequest,
    res: NextApiResponse<{ id: Entity['id']; tables?: Entity[] }>
) => {
    const id = <string>req.query.id;

    id
        ? listTables(id)
              .then((tables) => res.json({ id, tables }))
              .catch(() => res.json({ id }))
        : res.status(404).end();
};

export default handler;
