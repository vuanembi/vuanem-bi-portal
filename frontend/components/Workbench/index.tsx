import { FC, useEffect, useState } from 'react';

import { VStack, useToast } from '@chakra-ui/react';

import dayjs from 'dayjs';

import apiClient from '../../lib/api';
import Submit from './Submit';
import Results from './Results';
import { ResultItemProps } from './Results/ResultItem';

type WorkbenchProps = {
    dataset: string;
    table: string;
};

const Workbench: FC<WorkbenchProps> = ({ dataset, table }) => {
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ResultItemProps[]>([]);

    const title = () => `${dataset}.${table}`.slice(0, 30);

    const toast = useToast();

    useEffect(() => {
        dataset && table && setDisabled(false);
        !dataset || (!table && setDisabled(true));
    }, [dataset, table]);

    const handleRequest = () => {
        setLoading(true);
        apiClient()
            .post<{ url: string }>('/export', { dataset, table })
            .then(({ data }) =>
                setResults([
                    {
                        title: title(),
                        timestamp: dayjs(),
                        url: data.url,
                    },
                    ...results,
                ])
            )
            .then(() =>
                toast({
                    title: 'Link Generated',
                    description: 'Link will be valid for 1 hour',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            )
            .catch(() =>
                toast({
                    title: 'Export Error',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            )
            .finally(() => setLoading(false));
    };

    return (
        <VStack maxH="full" flex="0 0 33%" alignItems="stretch">
            <Submit
                title={dataset && table ? title() : '...'}
                disabled={disabled}
                loading={loading}
                onClick={handleRequest}
            />
            {results.length > 0 && <Results results={results} />}
        </VStack>
    );
};
export default Workbench;
