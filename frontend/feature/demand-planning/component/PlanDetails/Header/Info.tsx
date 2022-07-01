import {
    HStack,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatGroup,
} from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import usePlanStatus from '../../../hook/planStatus';

import { Plan } from '../../../type';

dayjs.extend(utc);

const Info = ({ name, startOfForecastWeek, status, updatedAt }: Plan) => {
    const { color, label } = usePlanStatus(status.name);

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
        </StatGroup>
    );
};

export default Info;