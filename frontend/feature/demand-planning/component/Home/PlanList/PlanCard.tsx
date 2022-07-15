import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { VStack, HStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { PlanStatus, planConfigs } from '../../../service/plan.config';
import { Plan } from '../../../service/plan.api';

dayjs.extend(utc);

const PlanCard = ({
    id,
    name,
    startOfForecastWeek,
    updatedAt,
    status,
}: Plan) => {
    const { color } = planConfigs[status as PlanStatus];

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
                textColor: "white",
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

export default PlanCard;
