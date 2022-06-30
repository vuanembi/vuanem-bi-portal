import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { HStack } from '@chakra-ui/react';
import { FaDatabase, FaTable, FaChartBar } from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';

import type { Entity } from '../../common/bigquery';
import apiClient from '../../lib/api';
import List from '../../page-component/data-service/List';
import Workbench from '../../page-component/data-service/Workbench';

const DataService: NextPage = () => {
    const [datasets, setDatasets] = useState<Entity[]>([]);
    const [datasetsLoaded, setDatasetsLoaded] = useState(false);
    const [dataset, setDataset] = useState('');

    const [tables, setTables] = useState<Entity[]>([]);
    const [tablesLoaded, setTablesLoaded] = useState(true);
    const [table, setTable] = useState('');

    useEffect(() => {
        apiClient('data-service')
            .get<Entity[]>('/dataset')
            .then(({ data }) => {
                setDatasets(data);
                setDatasetsLoaded(true);
            });
    }, []);

    useEffect(() => {
        setTablesLoaded(false);
        setTable('');
        dataset &&
            apiClient('data-service')
                .get<Entity[]>(
                    `/dataset/${dataset}`
                )
                .then(({ data }) => {
                    setTables(data);
                    setTablesLoaded(true);
                })
                .finally(() => setTablesLoaded(true));
        !dataset && setTablesLoaded(true);
    }, [dataset]);

    return (
        <HStack
            height="full"
            alignContent="space-between"
            alignItems="flex-start"
            spacing={10}
        >
            <List
                items={datasets}
                iconFn={() => FaDatabase}
                loaded={datasetsLoaded}
                handleSelect={setDataset}
            />
            <List
                items={tables}
                iconFn={({ type }: Entity) =>
                    type === 'TABLE'
                        ? FaTable
                        : type === 'VIEW'
                        ? FaChartBar
                        : SiGooglesheets
                }
                loaded={tablesLoaded}
                handleSelect={setTable}
            />
            <Workbench dataset={dataset} table={table} />
        </HStack>
    );
};

export const getStaticProps = async () => ({
    props: {
        title: 'Data Service',
    },
});

export default DataService;
