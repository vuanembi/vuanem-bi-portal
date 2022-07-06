import { Table } from '@tanstack/react-table';

import ExpandableButton from '../ExpendableButton';
import { PlanItemGroup } from '../../../../types';

type HeaderProps = {
    table: Table<PlanItemGroup>;
};

const ExpandableHeader = ({ table }: HeaderProps) => (
    <ExpandableButton
        getExpanded={table.getIsAllRowsExpanded}
        getToggle={table.getToggleAllRowsExpandedHandler}
    />
);

export default ExpandableHeader;
