import { Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { CellProps } from './cell.type';

dayjs.extend(utc);

const Date = ({ value }: CellProps) => (
    <Text>{dayjs.utc(value).local().format('YYYY-MM-DD')}</Text>
);

export default Date;
