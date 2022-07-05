import { useContext } from 'react';

import { HStack, VStack, Text, Icon, Spinner, Tooltip } from '@chakra-ui/react';
import { IoMdCloudDone } from 'react-icons/io';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';

dayjs.extend(utc);

const Info = () => {
    const { plan, updates } = useContext(PlanContext);

    const { name, startOfForecastWeek, status, vendor, updatedAt } = plan;
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
            <span>
                <Icon as={IoMdCloudDone} color={color} fontSize="2xl" />
            </span>
        </Tooltip>
    );
    return (
        <HStack
            flex="1"
            p={2}
            justifyContent="space-between"
            alignItems="flex-start"
            borderWidth="1px"
            borderColor={color}
            spacing={8}
        >
            <VStack
                flex="1"
                alignContent="stretch"
                alignItems="space-between"
                spacing={0}
                pr={4}
            >
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
                <HStack justifyContent="space-between">
                    <Tooltip
                        label="Start of Forecast Week"
                        placement="left-start"
                        {...tooltipProps}
                    >
                        <Text>
                            {dayjs(startOfForecastWeek).format('YYYY-MM-DD')}
                        </Text>
                    </Tooltip>
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
                </HStack>
            </VStack>
            {updates > 0 ? <Loading /> : <Done />}
        </HStack>
    );
};

export default Info;
