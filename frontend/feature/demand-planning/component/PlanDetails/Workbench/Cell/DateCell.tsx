import { Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { CellProps } from './Cell';

dayjs.extend(utc);

const DateCell = ({ value }: CellProps) => (
    <Text>{dayjs.utc(value).local().format('YYYY-MM-DD')}</Text>
);

export default DateCell;
