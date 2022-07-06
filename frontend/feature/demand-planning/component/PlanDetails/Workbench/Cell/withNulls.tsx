import { FC } from 'react';

import { CellProps } from '../Table.type';

const withNulls = (Component: FC<CellProps>) =>
    function WithNull(props: CellProps) {
        return props.getValue() ? <Component {...props} /> : null;
    };

export default withNulls;
