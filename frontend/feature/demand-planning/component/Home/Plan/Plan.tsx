import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { VStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import usePlanStatus from '../../../hook/planStatus';

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

const Plan = ({ id, name, updatedAt, status }: PlanProps) => {
    const { color } = usePlanStatus(status.name);

    const { pathname } = useRouter();

    return (
        <VStack
            as={LinkBox}
            flex="1"
            p={5}
            borderWidth={1}
            alignItems="stretch"
            borderColor={color}
            _hover={{
                bgColor: color,
            }}
        >
            <NextLink href={`${pathname}/${id}`} passHref>
                <LinkOverlay fontWeight="bold" userSelect="none">
                    {name.slice(0, 25)}
                </LinkOverlay>
            </NextLink>
            <Text fontSize="sm" userSelect="none">
                {dayjs.utc(updatedAt).local().format('YYYY-MM-DD HH:mm:ss')}
            </Text>
        </VStack>
    );
};

export default Plan;
