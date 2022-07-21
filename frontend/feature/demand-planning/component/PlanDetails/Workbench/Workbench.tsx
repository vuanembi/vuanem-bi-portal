import { useQuery } from 'react-query';

import { Box } from '@chakra-ui/react';

import TableWrapper from './TableWrapper';

import { usePlan } from '../../../provider/plan.context';
import * as PlanService from '../../../service/plan.api';
import * as PlanItemService from '../../../service/plan-item.api';

const Workbench = () => {
    const { plan, config } = usePlan();

    const { data: planItems } = useQuery<PlanItemService.PlanItem[]>(
        ['plan', plan.id, 'items'],
        PlanService.getOneItems(plan.id),
        { staleTime: Infinity, cacheTime: Infinity },
    );

    if (!planItems) {
        return null;
    }

    const data = planItems.map((planItem) => ({
        ...planItem,
        sku: planItem.item.sku,
    }));

    return (
        <Box
            bgColor="white"
            borderWidth="1px"
            borderColor={config.color}
            h="80vh"
        >
            <TableWrapper data={data} />
        </Box>
    );
};

export default Workbench;
