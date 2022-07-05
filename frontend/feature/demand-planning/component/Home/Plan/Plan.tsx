import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { VStack, HStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import usePlanStatus from '../../../hook/planStatus';
import { Plan as PlanProps } from '../../../types';

dayjs.extend(utc);

const Plan = ({
    id,
    name,
    startOfForecastWeek,
    updatedAt,
    status,
}: PlanProps) => {
    const { color } = usePlanStatus(status);

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
            <HStack justifyContent="space-between">
                <NextLink href={`${pathname}/${id}`} passHref>
                    <LinkOverlay fontWeight="bold" userSelect="none">
                        {name.slice(0, 25)}
                    </LinkOverlay>
                </NextLink>
                <Text userSelect="none">
                    {dayjs
                        .utc(startOfForecastWeek)
                        .local()
                        .format('YYYY-MM-DD')}
                </Text>
            </HStack>
            <Text fontSize="sm" userSelect="none">
                {dayjs.utc(updatedAt).local().format('YYYY-MM-DD HH:mm:ss')}
            </Text>
        </VStack>
    );
};

export default Plan;
