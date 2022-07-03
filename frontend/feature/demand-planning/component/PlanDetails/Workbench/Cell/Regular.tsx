import { Text } from '@chakra-ui/react';

import { CellProps } from './cell.type';

const Regular = ({ value }: CellProps) => <Text>{value || '-'}</Text>;

export default Regular;
