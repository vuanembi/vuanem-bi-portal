import {
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';
import { chain } from 'lodash';
import { useQuery } from 'react-query';

import Table from './Table';

import { PlanContext } from '../../../context';
import usePlanStatus from '../../../hook/planStatus';
import { getOneItems } from '../../../service/plan';
import { PlanItem } from '../../../service/plan-item';
import { Box } from '@chakra-ui/react';

type WorkbenchProps = {
    setUpdates: Dispatch<SetStateAction<number>>;
};

const Workbench = ({ setUpdates }: WorkbenchProps) => {
    const { plan, updates } = useContext(PlanContext);
    const { color, columns } = usePlanStatus(plan.status);
    const { data: planItems } = useQuery<PlanItem[]>(
        `plan[${plan.id}].items`,
        getOneItems(plan.id),
    );

    return (
        <Box bgColor="white" maxW="100%">
            <Table plan={plan} columns={columns} data={planItems} />;
        </Box>
    );
};

export default Workbench;
