import { Text } from '@chakra-ui/react';

import withNulls from './withNulls';
import { ColumnMeta, CellProps } from '../Table.type';

const DisplayCell = ({ column, getValue }: CellProps) => {
    const { formatter } = column.columnDef.meta as ColumnMeta;

    return <Text>{formatter(getValue())}</Text>;
};

export default withNulls(DisplayCell);
