import { useState, useEffect } from 'react';

import { TableContainer } from '@chakra-ui/react';

import Table from './Table';

import { apiClient } from '../../../lib';
import { Plan, PlanItem } from '../../../type';
import usePlanStatus from '../../../hook/planStatus';

declare module 'react-table' {
    interface HeaderGroup {
        isNumeric: boolean;
    }
    interface ColumnInstance {
        isNumeric: boolean;
    }
}

const Workbench = (plan: Plan) => {
    const { color, columns } = usePlanStatus(plan.status.name);
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);

    useEffect(() => {
        apiClient
            .get<PlanItem[]>('/plan-item', { params: { planId: plan.id } })
            .then(({ data }) => setPlanItems(Array(2).fill(data).flat()));
    }, [plan]);

    return (
        <TableContainer
            h="80vh"
            p={0}
            overflowY="scroll"
            borderWidth="1px"
            borderColor={color}
        >
            <Table plan={plan} columns={columns} data={planItems} />
        </TableContainer>
    );
};

export default Workbench;
