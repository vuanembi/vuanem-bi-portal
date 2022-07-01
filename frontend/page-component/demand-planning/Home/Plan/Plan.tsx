import { VStack, HStack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { planStatusStyles } from '../../../../page-lib/demand-planning';

dayjs.extend(utc);

export type PlanProps = {
    id: string;
    name: string;
    status: {
        name: string;
    };
    vendor: string;
    createdAt: Date;
    updatedAt: Date;
};

const Plan = ({ name, updatedAt, status }: PlanProps) => {
    const { color } = planStatusStyles[status.name];

    return (
        <VStack
            flex="1"
            p={5}
            borderWidth={1}
            alignItems="stretch"
            borderColor={color}
            _hover={{
                bgColor: color,
            }}
        >
            <HStack>
                <Text fontWeight="bold" userSelect="none">
                    {name.slice(0, 25)}
                </Text>
            </HStack>
            <Text fontSize="sm" userSelect="none">
                {dayjs.utc(updatedAt).local().format('YYYY-MM-DD HH:mm:ss')}
            </Text>
        </VStack>
    );
};

export default Plan;
