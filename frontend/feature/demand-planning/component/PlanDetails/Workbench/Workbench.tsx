import { useState, useEffect } from 'react';

import { TableContainer } from '@chakra-ui/react';

import Table from './Table';

import { apiClient } from '../../../lib';
import { Plan, PlanItem } from '../../../types';
import usePlanStatus from '../../../hook/planStatus';

type UpdateOptions = {
    index: number;
    item: PlanItem;
};

const Workbench = (plan: Plan) => {
    const { color, columns } = usePlanStatus(plan.status.name);
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);

    useEffect(() => {
        apiClient
            .get<PlanItem[]>('/plan-item', { params: { planId: plan.id } })
            .then(({ data }) => setPlanItems(Array(2).fill(data).flat()));
    }, [plan]);

    const handleUpdate = ({ index, item }: UpdateOptions) => {
        const updateData = planItems.map((data, i) =>
            i === index ? item : data,
        );

        apiClient.put(`plan-item/${item.id}`, item);
        setPlanItems(updateData);
    };

    return (
        <TableContainer
            h="80vh"
            p={0}
            overflowY="scroll"
            borderWidth="1px"
            borderColor={color}
        >
            <Table
                plan={plan}
                columns={columns}
                data={planItems}
                handleUpdate={handleUpdate}
            />
        </TableContainer>
    );
};

export default Workbench;
