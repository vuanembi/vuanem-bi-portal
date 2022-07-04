import { useContext } from 'react';

import {
    HStack,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatGroup,
    Icon,
    Spinner,
} from '@chakra-ui/react';
import { IoMdCloudDone } from 'react-icons/io';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';

dayjs.extend(utc);

const Info = () => {
    const { plan, updates } = useContext(PlanContext);

    const { name, startOfForecastWeek, status, updatedAt } = plan;
    const { color, label } = usePlanStatus(status);

    const Done = () => <Icon as={IoMdCloudDone} color={color} fontSize="2xl" />;

    return (
        <StatGroup
            as={HStack}
            flex="1"
            p={2}
            borderWidth="1px"
            borderColor={color}
        >
            <Stat size="sm">
                <StatLabel>Plan</StatLabel>
                <StatNumber>{name.slice(0, 50)}</StatNumber>
                <StatHelpText mb={0}>
                    {dayjs(startOfForecastWeek).format('YYYY-MM-DD')}
                </StatHelpText>
            </Stat>
            <Stat size="sm">
                <StatLabel>Status</StatLabel>
                <StatNumber>{label}</StatNumber>
                <StatHelpText mb={0}>
                    {dayjs.utc(updatedAt).local().format('YYYY-MM-DD HH:mm')}
                </StatHelpText>
            </Stat>
            {updates > 0 ? <Spinner color={color}/> : <Done />}
        </StatGroup>
    );
};

export default Info;
