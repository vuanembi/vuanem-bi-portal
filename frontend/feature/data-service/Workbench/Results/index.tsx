import { FC } from 'react';

import { VStack, Divider } from '@chakra-ui/react';

import ResultItem, { ResultItemProps } from './ResultItem';

const Results: FC<{ results: ResultItemProps[] }> = ({ results }) => (
    <VStack
        p={4}
        spacing={4}
        alignItems="stretch"
        borderWidth={1}
        divider={<Divider />}
        overflowY="auto"
    >
        {results.map((result) => (
            <ResultItem key={result.url} {...result} />
        ))}
    </VStack>
);
export default Results;
