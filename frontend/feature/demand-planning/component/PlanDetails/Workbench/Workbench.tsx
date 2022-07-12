import {
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';
import { chain } from 'lodash';
import { useQuery } from 'react-query';

import { TableContainer } from '@chakra-ui/react';

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

    if (!planItems) {
        return null;
    }

    return (
        <TableContainer
            h="80vh"
            p={0}
            overflowY="scroll"
            borderWidth="1px"
            borderColor={color}
            fontSize="sm"
        >
            <Table columns={columns} data={planItems} />
        </TableContainer>
    );
};

export default Workbench;
