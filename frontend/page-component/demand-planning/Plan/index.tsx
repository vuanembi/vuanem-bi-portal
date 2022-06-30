import { VStack, HStack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type PlanData = {
    id: string;
    name: string;
    status: string;
    vendor: string;
    createdAt: Date;
    updatedAt: Date;
};

export type PlanStyles = {
    color: string;
};

export type PlanProps = {
    data: PlanData;
    style: PlanStyles;
};

const Plan = ({ data, style }: PlanProps) => {
    const { name, updatedAt } = data;
    const { color } = style;

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
