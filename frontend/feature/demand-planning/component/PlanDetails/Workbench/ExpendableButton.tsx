import { useContext } from 'react';

import { IconButton } from '@chakra-ui/react';

import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

import { PlanContext } from '../../../context/index';
import usePlanStatus from '../../../hook/planStatus';

type ExpandableProps = {
    depth?: number;
    getExpanded: () => boolean;
    getToggle: () => (e: any) => void;
};

const ExpandableButton = ({ depth, getExpanded, getToggle }: ExpandableProps) => {
    const { plan } = useContext(PlanContext);
    const { color } = usePlanStatus(plan.status);

    const isExpanded = getExpanded();

    return (
        <IconButton
            aria-label="expand"
            ml={`${(depth || 0) * 2}rem`}
            color={isExpanded ? 'white' : color}
            bgColor={isExpanded ? color : 'inherit'}
            borderColor={isExpanded ? 'white' : color}
            borderWidth="1px"
            icon={isExpanded ? <FaChevronRight /> : <FaChevronDown />}
            onClick={getToggle()}
        />
    );
};

export default ExpandableButton;
