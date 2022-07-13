import { HeaderProps } from 'react-table';

import { PlanItem, PlanItemGroup } from '../../../service/plan-item';
import ExpandableButton from './ExpandableButton';

export const ExpandableHeader = ({
    getToggleAllRowsExpandedProps,
    isAllRowsExpanded,
}: HeaderProps<PlanItemGroup>) => (
    <ExpandableButton
        getProps={getToggleAllRowsExpandedProps}
        isExpanded={isAllRowsExpanded}
    />
);
