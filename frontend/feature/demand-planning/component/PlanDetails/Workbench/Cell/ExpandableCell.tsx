import ExpandableButton from '../ExpendableButton';

import { CellProps } from '../Table.type';

const Expandable = ({ row }: CellProps) =>
    row.getCanExpand() ? (
        <ExpandableButton
            depth={row.depth}
            getExpanded={row.getIsExpanded}
            getToggle={row.getToggleExpandedHandler}
        />
    ) : null;

export default Expandable;
