import { useContext } from 'react';
import { useQuery } from 'react-query';

import { Box } from '@chakra-ui/react';

import TableWrapper from './TableWrapper';

import { PlanContext } from '../../../service/plan.context';
import { getOneItems } from '../../../service/plan.api';
import { PlanItem } from '../../../service/plan-item.api';

const Workbench = () => {
    const { plan, config } = useContext(PlanContext);

    const { data: planItems } = useQuery<PlanItem[]>(
        ['plan', plan.id, 'items'],
        getOneItems(plan.id),
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
