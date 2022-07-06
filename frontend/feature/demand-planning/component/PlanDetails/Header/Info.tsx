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

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';

dayjs.extend(utc);

const Info = () => {
    const { plan, updates } = useContext(PlanContext);

    const { name, startOfForecastWeek, status, vendor, createdAt, updatedAt } =
        plan;
    const { color } = usePlanStatus(status);

    const tooltipProps = {
        bgColor: color,
        fontWeight: 'bold',
    };

    const Loading = () => (
        <Tooltip label="Loading" {...tooltipProps}>
            <Spinner color={color} />
        </Tooltip>
    );

    const Done = () => (
        <Tooltip label="Synced" {...tooltipProps}>
            <chakra.span lineHeight={0}>
                <Icon as={IoMdCloudDone} color={color} fontSize="2xl" />
            </chakra.span>
        </Tooltip>
    );
    return (
        <HStack
            flexBasis="80%"
            justifyContent="space-between"
            borderWidth="1px"
            borderColor={color}
            p={2}
        >
            <VStack alignItems="flex-start" flexBasis="70%" spacing={0}>
                <Tooltip label="Plan" placement="left-start" {...tooltipProps}>
                    <Text fontWeight="bold">{name}</Text>
                </Tooltip>
                <Tooltip
                    label="Vendor"
                    placement="left-start"
                    {...tooltipProps}
                >
                    <Text>{vendor.name}</Text>
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
                    {updates > 0 ? <Loading /> : <Done />}
                </HStack>
            </VStack>
        </HStack>
    );
};

export default Info;
