import { useContext } from 'react';
import { useQuery } from 'react-query';

import { Box } from '@chakra-ui/react';

import Table from './Table';

import { PlanContext } from '../../../service/plan.context';
import { getOneItems } from '../../../service/plan.service';
import { PlanItem } from '../../../service/plan-item.service';

const Workbench = () => {
    const { plan, config } = useContext(PlanContext);

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
                columns={config.columns}
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
