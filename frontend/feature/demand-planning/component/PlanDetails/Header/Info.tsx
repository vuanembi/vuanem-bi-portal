import { useContext } from 'react';

import {
    HStack,
    VStack,
    Text,
    Icon,
    Spinner,
    Tooltip,
    chakra,
} from '@chakra-ui/react';
import { IoMdCloudDone } from 'react-icons/io';

import { useIsFetching } from 'react-query'

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { PlanContext } from '../../../service/plan.context';

dayjs.extend(utc);

const Info = () => {
    const isFetching = useIsFetching()
    const { plan, config } = useContext(PlanContext);

    const { name, startOfForecastWeek, status, createdAt, updatedAt } = plan;

    const tooltipProps = {
        bgColor: config.color,
        fontWeight: 'bold',
    };

    const Loading = () => (
        <Tooltip label="Loading" {...tooltipProps}>
            <Spinner color={config.color} />
        </Tooltip>
    );

    const Done = () => (
        <Tooltip label="Synced" {...tooltipProps}>
            <chakra.span lineHeight={0}>
                <Icon as={IoMdCloudDone} color={config.color} fontSize="2xl" />
            </chakra.span>
        </Tooltip>
    );
    return (
        <HStack
            flexBasis="80%"
            justifyContent="space-between"
            alignItems="stretch"
            borderWidth="1px"
            borderColor={config.color}
            p={2}
        >
            <VStack alignItems="flex-start" flexBasis="70%" spacing={0}>
                <Tooltip label="Plan" placement="left-start" {...tooltipProps}>
                    <Text fontWeight="bold">{name}</Text>
                </Tooltip>
                <Tooltip
                    label="Start of Forecast Week"
                    placement="left-start"
                    {...tooltipProps}
                >
                    <Text>
                        {dayjs(startOfForecastWeek).format('YYYY-MM-DD')}
                    </Text>
                </Tooltip>
            </VStack>
            <VStack alignItems="stretch" flexBasis="30%" spacing={0}>
                <Tooltip
                    label="Created At"
                    placement="left-start"
                    {...tooltipProps}
                >
                    <Text>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</Text>
                </Tooltip>
                <Tooltip
                    label="Status"
                    placement="left-start"
                    {...tooltipProps}
                >
                    <Text textTransform="capitalize">{status}</Text>
                </Tooltip>
                <HStack justifyContent="space-between">
                    <Tooltip
                        label="Updated At"
                        placement="left-start"
                        {...tooltipProps}
                    >
                        <Text fontStyle="italic">
                            {dayjs
                                .utc(updatedAt)
                                .local()
                                .format('YYYY-MM-DD HH:mm')}
                        </Text>
                    </Tooltip>
                    {isFetching ? <Loading /> : <Done />}
                </HStack>
            </VStack>
        </HStack>
    );
};

export default Info;
