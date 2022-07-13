import {
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';
import { chain } from 'lodash';
import { useQuery } from 'react-query';

import { Box } from '@chakra-ui/react';

import Table from './Table';

import { PlanContext } from '../../../context';
import usePlanStatus from '../../../hook/planStatus';
import { getOneItems } from '../../../service/plan';
import { PlanItem, PlanItemGroup } from '../../../service/plan-item';

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
        <Box bgColor="white" maxW="100%">
            <Table
                columns={columns}
                data={planItems.map((planItem) => ({
                    ...planItem,
                    sku: planItem.item.sku,
                }))}
            />
            ;
        </Box>
    );
};

export default Workbench;
